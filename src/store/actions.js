import AuthenticationRepository from "@/repositories/AuthenticationRepository";
import axios from "axios";

export default {
    login({commit}, userCredentials) {

        return new Promise((resolve, reject) => {

            AuthenticationRepository.login(userCredentials)
                .then(response => {

                    if (response.data.success) {

                        const token = response.data.token

                        if (token) {
                            localStorage.setItem('token', token)
                            axios.defaults.headers.common['Authorization'] = token
                            commit('auth_success', token)
                            resolve()
                        }
                    } else {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(response.data.data.error)
                    }

                })
                .catch(error => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    console.log('auth login error', error);
                    // reject(error.response.data)
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

    setAuthUser({commit}) {

        return new Promise((resolve, reject) => {

            AuthenticationRepository.getUserDetails()
                .then(response => {

                    if (response.data.success) {
                        let userDetails = response.data.data[0]

                        commit('set_auth_user_details', userDetails)
                        resolve(userDetails.role)
                    } else {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        reject(response.data.data.error)
                    }

                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    reject(err)
                })
        })
    }
}
