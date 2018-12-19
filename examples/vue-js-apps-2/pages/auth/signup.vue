<template>
    <div class="col-sm-6 col-sm-offset-3">
        <h2>Sign Up</h2>
        <p>Sign up for an account.</p>
        <div class="alert alert-danger" v-if="error">
            <p v-if="error" class="error">{{ errorMessage }}</p>
        </div>
        <form @submit.prevent="signup">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter your username" v-model="username">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter your email" v-model="email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Enter your password" v-model="password">
            </div>
            <button class="btn btn-primary">signup</button>
        </form>
        <div class="row marketing">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: false,
            errorMessage: 'An error occured.'
        }
    },
    methods: {
        signup() {
            this.$cognitoAuth.signup(this.username, this.email, this.password, (error, result) => {
                if (error) {
                    this.error = true;
                    this.errorMessage = error.message;
                    console.error(error);
                } else {
                    console.log('Signup successful:', result);
                    this.$router.replace('/auth/confirm');
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
