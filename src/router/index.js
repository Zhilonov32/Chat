import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import PageNotFound from '../components/notFound/PageNotFound';
import {authGuard} from './guard';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: authGuard,
        },
        {
            path: '/Auth',
            name: 'Auth',
            component: () => import(/* webpackChunkName: "Auth" */ '../components/auth/Auth'),
        },
        {
            path: '*',
            component: PageNotFound,
        },
    ],
    mode: 'history',
});
