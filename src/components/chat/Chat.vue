<template>
    <div class="chat">
        <div class="chat__messages chat-messages">
            <div v-if="isInterlocutor && isMessages">
                <ChatField
                    v-for="messageConf in preparedMessages"
                    :key="messageConf.timestamp"
                    @resendMessage="resendMessage"
                    :message="messageConf"
                    :interlocutorId="interlocutor.id"
                    :stateMessage="stateMessages"
                />
            </div>
            <div class="chat__send-box">
                <textarea
                    v-model="message"
                    rows="10"
                    cols="45"
                    class="chat__input"
                ></textarea>
                <button
                    @click="sendMessage"
                    :disabled="isDisableButton"
                    :class="{'chat__button_disable': isDisableButton}"
                    class="chat__button"
                >
                    send
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import ChatField from './components/ChatField';

    export default {
        name: 'Chat',
        components: {ChatField},
        data: () => ({
            message: '',
        }),
        computed: {
            ...mapGetters(['interlocutor', 'messages', 'user', 'stateMessages', 'isInterlocutor']),
            preparedMessages() {
                return this.messages[this.chatId].slice(0).sort((mes1, mes2) => mes1.timestamp - mes2.timestamp);
            },
            isMessages() {
                return this.chatId in this.messages
                    ? Object.keys(this.messages[this.chatId]).length
                    : false;
            },
            isDisableButton() {
                return !Object.values(this.interlocutor).length || !this.message.length;
            },
            chatId() {
                return Number(this.interlocutor.id) * Number(this.user.id);
            },
        },
        methods: {
            resendMessage(message) {
                this.$store.dispatch('RESEND_MESSAGES', message);
            },
            sendMessage() {
                this.$store.dispatch('SEND_MESSAGE', {
                    recipientId: this.interlocutor.id,
                    senderId: this.user.id,
                    name: this.user.name,
                    message: this.message,
                    chatId: this.chatId,
                    timestamp: new Date().getTime(),
                });
                this.message = '';
            },
        },
    };
</script>

<style lang="sass">
@import "style/chat.sass"
</style>
