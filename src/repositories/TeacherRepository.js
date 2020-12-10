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

    getSubmissions(latest = null) {

        let endpoint = `${resource}/submissions`;

        if (latest) endpoint += '?latest=' + latest;

        return Repository.get(endpoint)

    },

    getSubjectsWithStudentsForTeacherClass({classID: classID, search: studentName}) {
        return Repository.post(`${resource}/classes/${classID}/subjects`, {
            filters: {
                search: studentName
            }
        })
    },

    getTeacherStudents({pageNum: pageNum, perPage: perPage, search: studentName}) {

        if(!pageNum) pageNum = 1;
        if(!perPage) perPage = 50;

        return Repository.post(`${resource}/students?page=${pageNum}`,{
            filters: {
                search: studentName,
                per_page: perPage
            }
        })
    },

    getTeacherSubjects(){
        return Repository.get(`/subjects`)
    }
}
