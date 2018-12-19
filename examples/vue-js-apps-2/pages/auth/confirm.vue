<template>
    <div class="col-sm-6 col-sm-offset-3">
        <h2>Confirm Account</h2>
        <p>
            Enter your confirmation code which was emailed to you.
        </p>
        <div class="alert alert-danger" v-if="error">
            <p v-if="error" class="error">{{ errorMessage }}</p>
        </div>
        <form @submit.prevent="confirm">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter your username" v-model="username">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter your confirmation code" v-model="code">
            </div>
            <button class="btn btn-primary">confirm</button>
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
            code: '',
            error: false,
            errorMessage: 'An error occured.'
        }
    },
    methods: {
        confirm() {
            this.$cognitoAuth.confirmRegistration(this.username, this.code, (error, result) => {
                if (error) {
                    this.error = true;
                    this.errorMessage = error.message;
                    console.error(error);
                } else {
                    this.$router.replace('/auth/signin');
                }
            });
        }
    }
}
</script>
