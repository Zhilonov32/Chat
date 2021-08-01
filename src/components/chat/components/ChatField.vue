<template>
    <div
        class="message"
        :class="{
            'message--recipient': interlocutorMessage,
            'message--sending': sending,
            'message--error': error
        }"
    >
        <div
            class="message__wrapper"
        >
            <div
                v-if="error"
                @click="$emit('resendMessage', message)"
                class="message__button button-close"
            >
                <div class="button__icon">
                    x
                </div>
            </div>
            <div class="message_user">
                {{ message.name }}
            </div>
            {{ message.message }}
            <div class="message_time">
                {{ timeSend }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChatField',
        props: {
            message: {
                type: Object,
                default: () => ({}),
            },
            interlocutorId: {
                type: Number,
                default: 0,
            },
            stateMessage: {
                type: Object,
                default: () => ({}),
            },
        },
        computed: {
            sending() {
                return this.stateMessage[this.message.timestamp]?.sending;
            },
            error() {
                return this.stateMessage[this.message.timestamp]?.error;
            },
            timeSend() {
                const timeSending = new Date(this.message.timestamp);

                return `${timeSending.getHours()} : ${timeSending.getMinutes()}`;
            },
            interlocutorMessage() {
                return this.message.recipientId !== this.interlocutorId;
            },
        },
    };

</script>

<style lang="scss">
@import "src/components/chat/style/chatField.sass";
</style>
