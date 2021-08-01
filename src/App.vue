<template>
    <div class="app">
        <Header />
        <div class="app__wrapper">
            <SubMenu
                v-if="isAuthUser"
                class="app__nav"
            />
            <router-view
                class="app__component"
            />
            <div
                v-if="isError"
                class="app__error error"
            >
                <div
                    @click="CLEAR_ERROR"
                    class="error__icon"
                >
                    x
                </div>
                <div class="error__text">
                    {{ error.message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import Header from './components/header/Header.vue';
    import SubMenu from './components/subMenu/SubMenu.vue';
    import {subscribeToLocalStorage} from './api/localStorageApi';
    import Lskeys from './constants/Lskeys';

    export default {
        components: {SubMenu, Header},
        computed: {
            ...mapGetters(['user', 'error', 'loading', 'isAuthUser', 'isError']),
        },
        created() {
            this.$store.dispatch('INIT_STORE');
        },
        mounted() {
            subscribeToLocalStorage(
                Lskeys.AUTHORIZED_USERS,
                (users) => this.UPDATE_CONTACTS(Object.values(users)),
            );
            subscribeToLocalStorage(
                Lskeys.MESSAGES,
                (messages) => this.UPDATE_MESSAGES(messages),
            );
        },
        methods: {
            ...mapMutations(['UPDATE_CONTACTS', 'UPDATE_MESSAGES', 'CLEAR_ERROR']),
        },
    };
</script>

<style lang="sass">
@import "style/common"
.app
  &__wrapper
    position: relative
    display: flex
    justify-content: center
  &__nav
    margin-top: 4em
    position: fixed
    top: 0
  &__component
    margin: 0 auto
  &__error
    position: fixed
    bottom: 0
    left: 50%
    margin-bottom: 20px

.error
  transform: translateX(-50%)
  color: red
  display: flex
  align-items: center
  padding: 5px
  border: 1px solid black
  border-radius: 5px

  &__text
    margin-left: 5px

  &__icon
    position: absolute
    right: -10px
    top: -10px
</style>
