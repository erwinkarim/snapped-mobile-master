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

  // Check if authRequired. Redirect to login if user is not logged in
  if(to.matched.some(record => record.meta.authRequired)) {

    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }

})
