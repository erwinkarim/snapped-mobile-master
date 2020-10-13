import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthenticationRepository from "@/repositories/AuthenticationRepository";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {

        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },

    },
    actions: {

        async login({commit}, userCredentials) {

            return new Promise((resolve, reject) => {

                AuthenticationRepository.login(userCredentials)
                    .then(response => {

                        const data = response.data.success

                        const token = data.token
                        const user = data.user

                        if (token) {
                            localStorage.setItem('token', token)
                            axios.defaults.headers.common['Authorization'] = token

                            commit('auth_success', token, user)
                            resolve(response)
                        }

                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },

        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },

    },
    modules: {}
})
