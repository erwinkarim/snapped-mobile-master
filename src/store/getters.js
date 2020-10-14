
export default  {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getAuthUser: state => state.authUser,
    getAuthUserRole: (state, getters) => {
        return getters.getAuthUser.role
    },
    getAuthUsername: (state, getters) => {
        return getters.getAuthUser.name
    },
    getToken : state => state.token
}
