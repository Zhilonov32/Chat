export default {
    user: (state) => state.user,
    loading: (state) => state.loading,
    error: (state) => state.error,
    contacts: (state) => state.contacts,
    interlocutor: (state) => state.interlocutor,
    messages: (state) => state.messages,
    stateMessages: (state) => state.stateMessages,
    isAuthUser: (state) => !!Object.values(state.user).length,
    isError: (state) => !!Object.values(state.error).length,
    isInterlocutor: (state) => !!Object.values(state.interlocutor).length,
};
