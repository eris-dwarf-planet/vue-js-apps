<template>
    <div>
    </div>
</template>

<script>
export default {
    created: function () {
        this.$cognitoAuth.signout();
        this.$store.dispatch('setUser', null);
        this.$router.replace('/');
    }
}
</script>

<style>
.error {
    color: red;
}
</style>
