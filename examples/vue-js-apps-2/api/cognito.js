import { Config, CognitoIdentityCredentials } from 'aws-sdk'
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import * as AWS from "aws-sdk/global";

export default class CognitoAuth {
    constructor(options) {
        console.log('options', options);

        this.apps = [];
        this.options = options;
        this.userSession = null;
        this.userPool = new CognitoUserPool({
            UserPoolId: options.UserPoolId,
            ClientId: options.ClientId
        });
        this.identityId = null;
        Config.region = options.region;
        Config.credentials = new CognitoIdentityCredentials({
            IdentityPoolId: options.IdentityPoolId
        });
    }

    isAuthenticated(cb) {
        let cognitoUser = this.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession((error, session) => {
                if (error) {
                    return cb(error, null);
                }
                console.log('UserLoginService: Session is', session.isValid());
                return cb(null, cognitoUser);
            })
        } else {
            cb(null, null);
        }
    }

    signup(username, email, password, cb) {
        let attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            })
        ];

        this.userPool.signUp(username, password, attributeList, null, cb);
    }

    confirmRegistration(username, code, cb) {
        let cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool
        });
        cognitoUser.confirmRegistration(code, true, cb);
    }

    resendCode(username, code, cb) {
        let cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool
        });
        cognitoUser.resendConfirmationCode(cb);
    }

    signin(username, pass, cb) {
        let authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: pass
        });
        let cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool
        });
        var self = this;
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                var logins = {};
                logins['cognito-idp.' + self.options.region + '.amazonaws.com/' + self.options.UserPoolId] = result.getIdToken().getJwtToken();
                AWS.config.update({
                    region: self.options.region,
                    credentials: new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: self.options.IdentityPoolId,
                        Logins: logins
                    })
                });
                AWS.config.credentials.refresh(function (error) {
                    if (error) {
                        console.error('awsRefresh error:', error);
                    } else {
                        self.identityId = AWS.config.credentials.identityId;
                        self.onChange(true);
                        cb(null, result);
                    }
                });
            },
            onFailure: (error) => {
                cb(error)
            }
        })
    }

    signout() {
        if (this.getCurrentUser()) {
            this.getCurrentUser().signOut();
        }
        this.onChange(false);
    }

    /**
     * Resolves the current token based on a user session. If there
     * is no session it returns null.
     * @param {*} cb callback
     */
    getIdToken(cb) {
        if (this.userPool.getCurrentUser() == null) {
            return cb(null, null);
        }
        this.userPool.getCurrentUser().getSession((err, session) => {
            if (err) return cb(err);
            if (session.isValid()) {
                return cb(null, session.getIdToken().getJwtToken());
            }
            cb(Error('Session is invalid'));
        })
    }

    getCurrentUser() {
        return this.userPool.getCurrentUser();
    }

    getCognitoIdentity() {
        return this.identityId;
    }

    init(app) {
        this.apps.push(app);
    }

    // very primitive change listener
    onChange() { }
}

CognitoAuth.install = function (Vue, options) {
    Object.defineProperty(Vue.prototype, '$cognitoAuth', {
        get() {
            return this.$root._cognitoAuth
        }
    })

    Vue.mixin({
        beforeCreate() {
            if (this.$options.cognitoAuth) {
                this._cognitoAuth = this.$options.cognitoAuth;
                this._cognitoAuth.init(this);
            }
        }
    })
}