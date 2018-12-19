<template>
    <div class="col-sm-6 col-sm-offset-3">
        <h2>Sign In</h2>
        <p v-if="$route.query.redirect">
            Sign in to your account.
        </p>
        <div class="alert alert-danger" v-if="error">
            <p v-if="error" class="error">{{ errorMessage }}</p>
        </div>
        <form @submit.prevent="signin">
            <div class="form-group">
                <input id="inputUsername" type="text" class="form-control" placeholder="Enter your username" v-model="username">
            </div>
            <div class="form-group">
                <input id="inputPassword" type="password" class="form-control" placeholder="Enter your password" v-model="password">
            </div>
            <button class="btn btn-primary">sign</button>
        </form>
        <div class="row marketing">
            <p>
                <router-link to="/auth/signup">Create an account</router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            error: false,
            errorMessage: 'An error occured.'
        }
    },
    methods: {
        signin() {
            this.$cognitoAuth.signin(this.username, this.password, (error, result) => {
                if (error) {
                    this.error = true;
                    this.errorMessage = error.message;
                    console.error(error);
                } else {
                    console.log('Signin Successful:', result);
                    this.$store.dispatch('setUser', result);
                    this.$router.replace(this.$route.query.redirect || '/');
                }
            });
        }
    }
}
</script>

<style>
.error {
    color: red;
}
</style>
