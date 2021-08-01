import {getUrlParamItem} from '../api/urlApi';
import urlKeys from '../constants/urlKeys';

export function authGuard(to, from, next) {
    // eslint-disable-next-line no-unused-expressions
    getUrlParamItem(urlKeys.AUTHORIZED_USER_ID)
        ? next()
        : next({name: 'Auth'});
}
