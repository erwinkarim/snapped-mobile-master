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

  // Check if authRequired. Redirect to login if user is not logged in
  if(to.matched.some(record => record.meta.authRequired)) {

    if (store.getters.isLoggedIn) {

      let authUserDetails = store.getters.getAuthUser;

      // Check if authenticated user's details does not exist. If no, get.
      if (Object.keys(authUserDetails).length === 0 && authUserDetails.constructor === Object) {
        store.dispatch('setAuthUser')
      }

      next()
      return
    }
    next('/login')
  } else {
    next()
  }

})
