<template>
    <div class="sub-menu">
        <Interlocutors
            :contacts="contacts"
        />
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import Interlocutors from './components/Interlocutors.vue';

    export default {
        name: 'SubMenu',
        components: {Interlocutors},
        computed: {
            ...mapGetters(['contacts']),
        },
    };
</script>

<style lang="sass">
@import "style/subMenu"
</style>
