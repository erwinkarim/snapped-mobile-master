import moment from "moment";

export default  {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getAuthUser: state => state.authUser,
    getAuthUserRole: (state, getters) => {
        return getters.getAuthUser.role
    },
    getAuthUserGender: (state, getters) => {
        return getters.getAuthUser.gender
    },
    getAuthUsername: (state, getters) => {
        return getters.getAuthUser.fullname
    },
    getAuthEmail: (state, getters) => {
        return getters.getAuthUser.email
    },

    getGoogleIntegrated: (state, getters) => {
        return getters.getAuthUser.google_integrated
    },
    getToken : state => state.token,

    currentYear: () => {
        return moment().year()
    }

}
