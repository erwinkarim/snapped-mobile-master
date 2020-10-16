import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes"
import store from '@/store/index'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router


router.beforeEach((to, from, next) => {

    // Check if route does not exist. If true, redirect to login
    if (to.matched.length === 0) {
        return next({name: 'login'})
    }

    // When entering root path '/'
    if (to.path === from.path) {

        if (localStorage.getItem('token')) {

            store.commit('auth_success', localStorage.getItem('token'))
            store.dispatch('setAuthUser')
                .then(response => {
                        return next({name: 'home'})
                    }
                )

        } else {
            return next({name: 'login'})
        }
    }

    // If path is login, check if user is logged in. If yes, then redirect to home
    if (to.path === '/login') {

        if (store.getters.isLoggedIn) {
            return next({name: 'home'})
        }
        return next()
    }

    // If route has guard 'checkAuth'.
    if (to.matched.some(record => record.meta.checkAuth)) {

        // Check if user is logged in.
        if (store.getters.isLoggedIn) {

            // Check if authenticated user's details does not exist. If no, get.
            let authUserDetails = store.getters.getAuthUser;
            if (Object.keys(authUserDetails).length === 0 && authUserDetails.constructor === Object) {
                store.dispatch('setAuthUser')
                    .then(response => {
                        // If route has guard 'checkRole'
                        if (to.matched.some(record => record.meta.checkRole)) {
                            if (store.getters.getAuthUserRole === to.meta.checkRole) {
                                return next()
                            } else {
                                console.log('No Access!')
                                return next(false)
                            }
                        }
                    })
            }

        } else {
            return next({name: 'login'})
        }

    }

    // If route is open to public, allow next
    else {
        return next()
    }

})
