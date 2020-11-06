import Repository from "@/repositories/Repository";

const resource = '/teachers'

export default {

    getTeacherClasses () {
        return Repository.get(`${resource}/classes`)
    },

    getTeacherAssignments () {
        return Repository.post(`/assignments`, {
            filters : {
                is_active : false,
                month : null,
                year : null,
                subjects : null
            }
        })
    },

    getSubjectsWithStudentsForTeacherClass({classID: classID, search: studentName}) {
        return Repository.post(`${resource}/classes/${classID}/subjects`, {
            filters: {
                search: studentName
            }
        })
    },

    getTeacherStudents({search: studentName}) {
        return Repository.post(`${resource}/students`,{
            filters: {
                search: studentName
            }
        })
    }
}
