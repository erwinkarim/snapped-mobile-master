import Repository from "@/repositories/Repository";

const resource = '/teachers'

export default {

    getTeacherClasses () {
        return Repository.get(`${resource}/classes`)
    },

    getTeacherAssignments () {
        return Repository.get(`${resource}/assignments`)
    },

    getSubjectsWithStudentsForTeacherClass(classID) {
        return Repository.get(`${resource}/classes/${classID}/subjects`)
    },

    getTeacherStudents({search: studentName}) {
        return Repository.get(`${resource}/students`,{
            params: {
                search: studentName
            }
        })
    }
}
