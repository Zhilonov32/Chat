<template>
    <div class="login">
        <div class="container">
            <div class="login__wrapper">
                <form
                    @keyup.enter="loginPassAuth"
                    @submit.prevent
                    class="login__form"
                >
                    <div class="login__fields">
                        <AuthField
                            v-model="name"
                        />
                    </div>
                    <button
                        @click="loginPassAuth"
                        class="login__button button-login"
                        :class="{'login__button_disable' :loading}"
                        :disabled="loading"
                    >
                        вход
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import urlKeys from '../../constants/urlKeys';
    import AuthField from './components/AuthField.vue';

    export default {
        name: 'Auth',
        components: {AuthField},
        data: () => ({
            name: '',
        }),
        computed: {
            ...mapGetters(['loading', 'user']),
        },
        methods: {
            loginPassAuth() {
                this.$store.dispatch('AUTH_USER', {name: this.name})
                    .then(() => {
                        this.$router.push({
                            name: 'Home',
                            query: {[urlKeys.AUTHORIZED_USER_ID]: this.user.id},
                        });
                    });
            },
        },
    };
</script>

<style lang="sass">
@import "style/login.sass"
</style>
