import * as AWS from "aws-sdk/global";
import * as DynamoDB from "aws-sdk/clients/dynamodb";

export default class DynamoClient {
    constructor(options) {
        console.log('options', options);
        this.apps = [];
        this.options = options;
    }

    getAWS() {
        return AWS;
    }

    findByUserId(userId, cb) {
        var params = {
            TableName: 'serverless_todos',
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": userId
            }
        };

        var client = new DynamoDB.DocumentClient();
        client.query(params, cb);
    }

    save(userId, todos, cb) {
        var item = {
            TableName: 'serverless_todos',
            Item: {
                userId: userId,
                todos: todos
            }
        };
        var client = new DynamoDB.DocumentClient();
        client.put(item, cb);
    }

    init(app) {
        this.apps.push(app);
    }
}

DynamoClient.install = function(Vue, options) {
    Object.defineProperty(Vue.prototype, '$dynamoClient', {
        get() {
            return this.$root._dynamoClient
        }
    })

    Vue.mixin({
        beforeCreate() {
            if (this.$options.dynamoClient) {
                this._dynamoClient = this.$options.dynamoClient;
                this._dynamoClient.init(this);
            }
        }
    })
}