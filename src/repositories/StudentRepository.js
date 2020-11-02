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

    getClassRanking() {
        return Repository.get(`${resource}/class-ranking`)
    },

    getClassTeachers() {
        return Repository.get(`${resource}/teachers`)
    },

    getClassmates() {
        return Repository.get(`${resource}/classmates`)
    }


}
