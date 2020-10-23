import Repository from "@/repositories/Repository";

const resource = '/students'

export default {

    getOverview(studentID) {
        return Repository.get(`${resource}/${studentID}/overview`)
    },

    getRanking(studentID) {
        return Repository.get(`${resource}/${studentID}/ranking`)
    },

    getAssignments(studentID) {
        return Repository.get(`${resource}/${studentID}/assignments`)
    },

    getMarkedAssignments(studentID) {
        return Repository.get(`${resource}/${studentID}/assignments/marks`)
    },


}
