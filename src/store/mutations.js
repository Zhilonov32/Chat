export default {
    SET_USER_DATE(state, payload) {
        state.user = payload;
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_ERROR(state, payload) {
        state.error = payload;
    },
    CLEAR_ERROR(state) {
        state.error = {};
    },
    UPDATE_CONTACTS(state, contacts) {
        state.contacts = contacts;
    },
    SET_INTERLOCUTOR(state, contact) {
        state.interlocutor = contact;
    },
    ADD_MESSAGES(state, payload) {
        // eslint-disable-next-line no-unused-expressions
        payload.chatId in state.messages
            ? state.messages[payload.chatId] = [...state.messages[payload.chatId], payload]
            : state.messages[payload.chatId] = [payload];
        state.messages = {...state.messages};
    },
    UPDATE_MESSAGES(state, payload) {
        state.messages = payload;
    },
    SET_STATUS_MESSAGE(state, {timestamp = 0, key = ''}) {
        // eslint-disable-next-line no-unused-expressions
        timestamp in state.stateMessages
            ? state.stateMessages[timestamp][key] = true
            : state.stateMessages[timestamp] = {[key]: true};
    },
    REMOVE_STATUS_MESSAGE(state, {timestamp = 0, key = ''}) {
        state.stateMessages[timestamp][key] = false;
        state.stateMessages = {...state.stateMessages};
    },
};
