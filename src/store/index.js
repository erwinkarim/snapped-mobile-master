import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import teacherMarking from "@/store/modules/teacherMarking";
import teacherCreateAssignment from "@/store/modules/teacherCreateAssignment";
import studentRanking from "@/store/modules/studentRanking";
import integrations from "@/store/modules/integrations";

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
        integrations: integrations,
        teacherMarking: teacherMarking,
        teacherCreateAssignment: teacherCreateAssignment,
        studentRanking: studentRanking
    }
})
