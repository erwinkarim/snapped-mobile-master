// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore as _createStore } from 'vuex'
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import teacherMarking from "@/store/modules/teacherMarking";
import teacherCreateAssignment from "@/store/modules/teacherCreateAssignment";
import studentRanking from "@/store/modules/studentRanking";
import studentAssignment from '@/store/modules/studentAssignment';

// Vue.use(Vuex)

// export default new Vuex.Store({
export function createStore(){
//new Vuex.Store({
    return _createStore({
        state: {
            status: '',
            token: localStorage.getItem('token') || '',
            authUser: {},
            get route() {
                return router.currentRoute.value;
            },
        },
        getters,
        mutations,
        actions,
        modules: {
            teacherMarking: teacherMarking,
            teacherCreateAssignment: teacherCreateAssignment,
            studentRanking: studentRanking,
            studentAssignment: studentAssignment,
        }
    });
}
