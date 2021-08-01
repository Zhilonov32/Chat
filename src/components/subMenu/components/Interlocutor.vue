<template>
    <div
        @click="$emit('setInterlocutor', contact)"
        :class="{'contact_focus': selectedContact === contact.id}"
        class="contact"
    >
        <div class="contact__text">
            {{ contact.name }}
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Interlocutor',
        props: {
            contact: {
                type: Object,
                default: () => ({}),
            },
            selectedContact: {
                type: Number,
                default: 0,
            },
        },
    };
</script>

<style lang="sass">
@import "src/components/subMenu/style/interlocutor.sass"
</style>
