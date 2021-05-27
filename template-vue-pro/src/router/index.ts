import {createRouter, createWebHistory} from 'vue-router'

import NotFound from '@/views/NotFound'

const Home = () => import(/* webpackChunkName: 'Home' */'@/views/Home')
const About = () => import(/* webpackChunkName: 'About' */'@/views/About')

export const router = createRouter({
    history: createWebHistory('/app/base'),
    routes: [{
        path: '/',
        redirect: {name: 'home'},
    }, {
        path: '/home',
        name: 'home',
        component: Home,
    }, {
        path: '/about',
        name: 'about',
        component: About,
    }, {
        path: '/*',
        name: 'notFound',
        component: NotFound,
    }],
})
