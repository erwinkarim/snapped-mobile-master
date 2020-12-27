import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthenticationRepository from "@/repositories/AuthenticationRepository";
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import teacherMarking from "@/store/modules/teacherMarking";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        authUser: {}
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {
        teacherMarking: teacherMarking
    }
})
