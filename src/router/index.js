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

    // If path is login, check if user is logged in. If yes, then redirect to home
    if (to.path === '/login') {
        if (store.getters.isLoggedIn) {
            next('/')
        }
    }

    // If route has guard 'checkAuth'.
    if (to.matched.some(record => record.meta.checkAuth)) {

        let isAllowed = false;

        // Check if user is logged in.
        if (store.getters.isLoggedIn) {

            let authUserDetails = store.getters.getAuthUser;

            // Check if authenticated user's details does not exist. If no, get.
            if (Object.keys(authUserDetails).length === 0 && authUserDetails.constructor === Object) {
                store.dispatch('setAuthUser')
            }

            // If route has guard 'checkRole'
            if (to.matched.some(record => record.meta.checkRole)) {

              console.log(`Route: ${to.meta.checkRole}`)

              console.log(`User: ${store.getters.getAuthUserRole}`)
              // if (store.getters.getAuthUserRole) {
              //
              // }
            }

        }  else {
            next('/login')
        }

    }

    // If route is open to public, allow next
    else {
        next()
    }

})
