<template>
    <div>
        <Interlocutor
            v-for="contact in contacts"
            :key="contact.timestamp"
            @setInterlocutor="setInterlocutor"
            :contact="contact"
            :selectedContact="interlocutor.id"
        />
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import Interlocutor from './Interlocutor.vue';

    export default {
        name: 'Interlocutors',
        components: {Interlocutor},

        props: {
            contacts: {
                type: Array,
                default: () => ([]),
            },
        },
        computed: {
            ...mapGetters(['interlocutor']),
        },
        methods: {
            setInterlocutor(interlocutor) {
                this.$store.commit('SET_INTERLOCUTOR', interlocutor);
            },
        },
    };
</script>

<style>

</style>
