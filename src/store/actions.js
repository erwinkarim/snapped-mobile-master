import AuthenticationRepository from "@/repositories/AuthenticationRepository";
import axios from "axios";

export default  {
    login({commit}, userCredentials) {

        return new Promise((resolve, reject) => {

            AuthenticationRepository.login(userCredentials)
                .then(response => {

                    const data = response.data.success

                    const token = data.token

                    if (token) {
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token

                        commit('auth_success', token)
                        resolve()
                    }

                })
                .catch(error => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(error.response.data)
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

    setAuthUser({commit}){

        return new Promise((resolve, reject) => {

            AuthenticationRepository.getUserDetails()
                .then(response => {

                    let userDetails = response.data.success

                    commit('set_auth_user_details', response.data.success)
                    resolve(userDetails.role)

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
