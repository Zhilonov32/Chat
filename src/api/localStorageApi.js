import LsKeys from '../constants/Lskeys';

const storageHandlers = new Map();

window.addEventListener('storage', (e) => {
    const handlers = storageHandlers.get(e.key) ?? [];

    handlers.forEach((fn) => fn(JSON.parse(e.newValue)));
});

export const subscribeToLocalStorage = (key, cb) => {
    const subscribers = storageHandlers.get(key) || [];

    storageHandlers.set(key, [...subscribers, cb]);
};

export function getItemLS(key) {
    return JSON.parse(localStorage.getItem(key)) ?? null;
}

function setItemLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getUserLS(value) {
    return getItemLS(LsKeys.AUTHORIZED_USERS)?.[value] ?? null;
}

export function addContactLS(value) {
    const users = getItemLS(LsKeys.AUTHORIZED_USERS) ?? {};
    const updatedAuthorizedUsers = {...users, [value.id]: value};

    setItemLocalStorage(LsKeys.AUTHORIZED_USERS, updatedAuthorizedUsers);
}

export function addMessageLS(value) {
    const messagesDB = getItemLS(LsKeys.MESSAGES) ?? {};

    // eslint-disable-next-line no-unused-expressions
    value.chatId in messagesDB
        ? messagesDB[value.chatId].push(value)
        : messagesDB[value.chatId] = [value];
    setItemLocalStorage(LsKeys.MESSAGES, {...messagesDB});
}
