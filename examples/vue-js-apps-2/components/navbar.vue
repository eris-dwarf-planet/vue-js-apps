<template>
    <div class="header clearfix">
        <nav>
            <ul class="nav nav-pills pull-right">
                <li>
                    <nuxt-link to="/" exact>Home</nuxt-link>
                </li>
                <li>
                    <nuxt-link v-if="isAuthenticated" to="/todos">Todos</nuxt-link>
                </li>
                <li>
                    <nuxt-link v-if="!isAuthenticated" to="/auth/signup">SignUp</nuxt-link>
                </li>
                <li>
                    <nuxt-link v-if="!isAuthenticated" to="/auth/signin">SignIn</nuxt-link>
                </li>
                <li>
                    <nuxt-link v-if="isAuthenticated" to="/auth/signout">SignOut</nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: mapGetters(['isAuthenticated'])
}
</script>
