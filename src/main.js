import Vue, { createApp, h } from 'vue'
import App from './App.vue'
import { setupCalendar } from 'v-calendar';

// import router from './router'
// import store from './store'

import { createStore } from './store'
import { createRouter } from './router'
import '@/assets/styles/tailwind.css'

Vue.config.productionTip = false

const router = createRouter()
const store = createStore(router)

export { store, router };

//new Vue({ 
const app = createApp({
  // router,
  // store,
  render: () => h(App)
  //...App,
  //App
});

router.beforeEach((to, from, next) => {
//router.beforeEach(async (to, from) => {
    /*
    console.log('to.path', to.path);
    console.log('from.path', from.path);
    console.log('to.matched.length', to.matched.length);
    */

  // Check if route does not exist. If true, redirect to login
  if (to.matched.length === 0 && to.path !== '/') {
      return next({name: 'login'})
  }

  // When entering root path '/'
  if (to.path === from.path && from.path == '/') {
      if (localStorage.getItem('token')) {

          store.commit('auth_success', localStorage.getItem('token'))
          store.dispatch('setAuthUser')
              .then(userRole => {
                      if (userRole === 'Student') {
                        console.log('should show student home')
                        return next({name: 'student.home'})
                      } 

                      if (userRole === 'Teacher') {
                        return next({name: 'teacher.home'})
                      }
                  }
              )

      } else {
          next({name: 'login'})
          return
      }
  }

  // If path is login, check if user is logged in. If yes, then redirect to home
  if (to.path === '/login') {
      if (store.getters.isLoggedIn) {

          // Check if authenticated user's details does not exist. If no, get.
          let authUserDetails = store.getters.getAuthUser;

          if (Object.keys(authUserDetails).length === 0 && authUserDetails.constructor === Object) {

              store.dispatch('setAuthUser')
                  .then(userRole => {

                      if (userRole === 'Student') {
                              return next({name: 'student.home'})
                          }

                          if (userRole === 'Teacher') {
                              return next({name: 'teacher.home'})
                          }
                      }
                  )
          } else {

              if (authUserDetails.role === 'Student') {
                  return next({name: 'student.home'})
              }

              if (authUserDetails.role === 'Teacher') {
                  return next({name: 'teacher.home'})
              }
          }
      } else {
          return next()
      }

      return next(false)
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
                              return next(false)
                          }
                      } else{
                          // If only check auth && without check role
                          return next()
                      }
                  })
          } else {

              if (to.matched.some(record => record.meta.checkRole)) {
                  if (store.getters.getAuthUserRole === to.meta.checkRole) {
                      return next()
                  } else {
                      return next(false)
                  }
              } else {

                  // If only check auth && without check role
                  return next()
              }
          }

      } else {
          return next({name: 'login'})
      }

  }
  else {
      // If route is open to public, allow next
      // return next()
      return
  }

  return;
});

app.use(store)
app.use(router)
app.use(setupCalendar, {})

app.mount('#app')


