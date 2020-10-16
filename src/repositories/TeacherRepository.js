import Repository from "@/repositories/Repository";

const resource = '/teachers'

export default {

    getTeacherClasses () {
        return Repository.get(`${resource}/classes`)
    },

    getTeacherAssignments () {
        return Repository.get(`${resource}/assignments`)
    }
}
