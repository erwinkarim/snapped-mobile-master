
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
    getToken : state => state.token
}
