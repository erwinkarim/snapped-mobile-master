import Repository from "@/repositories/Repository";

export default {

    login(payload) {
        return Repository.post('/login', payload)
    },

    logout(payload) {
        return Repository.post('/logout', payload)
    },

    getUserDetails () {
        return Repository.post('/details')
    }

}
