import {
    addContactLS, addMessageLS, getItemLS, getUserLS,
} from '../api/localStorageApi';
import {getUrlParamItem, setUrlParam} from '../api/urlApi';
import statusKey from '../constants/statusMessageKey';
import urlKeys from '../constants/urlKeys';
import LsKeys from '../constants/Lskeys';

class User {
    constructor({name = '', email = '', avatar = 'noName'}) {
        this.id = Math.floor(Math.random() * 1000);
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.timestamp = new Date().getTime();
    }
}

export default {
    async AUTH_USER({commit}, {name = ''}) {
        const user = new User({name});

        commit('SET_LOADING', true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setUrlParam(urlKeys.AUTHORIZED_USER_ID, user.id);
            commit('SET_USER_DATE', user);
            addContactLS(user);
        } catch {
            commit('SET_ERROR', {message: 'error auth...'});
        } finally {
            commit('SET_LOADING', false);
        }
    },
    async INIT_STORE({commit}) {
        const userIdUrl = getUrlParamItem(urlKeys.AUTHORIZED_USER_ID) || 0;
        const userData = getUserLS(userIdUrl) || {};
        const contacts = Object.values(getItemLS(LsKeys.AUTHORIZED_USERS) || {});
        const messages = getItemLS(LsKeys.MESSAGES) || {};

        commit('SET_LOADING', true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            commit('UPDATE_CONTACTS', contacts);
            commit('UPDATE_MESSAGES', messages);
            commit('SET_USER_DATE', userData);
        } catch {
            commit('SET_ERROR', {message: 'error 500'});
        } finally {
            commit('SET_LOADING', false);
        }
    },
    async SEND_MESSAGE({commit}, massage = {}) {
        commit('ADD_MESSAGES', massage);
        commit('SET_STATUS_MESSAGE', {timestamp: massage.timestamp, key: statusKey.SENDING_MESSAGE});
        await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            addMessageLS(massage);
        }).catch(() => {
            commit('SET_STATUS_MESSAGE', {timestamp: massage.timestamp, key: statusKey.ERROR_MESSAGE});
        }).finally(() => {
            commit('REMOVE_STATUS_MESSAGE', {timestamp: massage.timestamp, key: statusKey.SENDING_MESSAGE});
        });
    },
    async RESEND_MESSAGES({commit}, massage = {}) {
        massage.timestamp = new Date().getTime();
        commit('SET_STATUS_MESSAGE', {timestamp: massage.timestamp, key: statusKey.SENDING_MESSAGE});
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            addMessageLS(massage);
            commit('REMOVE_STATUS_MESSAGE', {timestamp: massage.timestamp, key: statusKey.ERROR_MESSAGE});
        } catch {
            commit('SET_STATUS_MESSAGE', {timestamp: massage.timestamp, key: statusKey.ERROR_MESSAGE});
        } finally {
            commit('REMOVE_STATUS_MESSAGE', {timestamp: massage.timestamp, key: statusKey.SENDING_MESSAGE});
        }
    },
};
