import Repository from "@/repositories/Repository";

const resource = '/teachers'
const token = localStorage.getItem('token')

export default {

    getTeacherDetails(){
        return Repository.post('/details',{
            headers: {
                Accept: "application/json",
                Authorization: 'Bearer ' + token,
            }
        })
    },

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
    },

    getTeacherSubjects(){
        return Repository.get(`/subjects`)
    }
}
