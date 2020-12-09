import Repository from "@/repositories/Repository";

const resource = '/students'
const token = localStorage.getItem('token')

export default {

    getStudentDetails(){
        return Repository.post('/details',{
            headers: {
                Accept: "application/json",
                Authorization: 'Bearer ' + token,
            }
        })
    },

    getOverview(studentID) {
        return Repository.get(`${resource}/${studentID}/overview`)
    },

    getRanking(studentID) {
        return Repository.get(`${resource}/${studentID}/ranking`)
    },

    getMarkedAssignments(studentID) {
        return Repository.get(`${resource}/${studentID}/assignments/marks`)
    },

    getClassRanking() {
        return Repository.get(`${resource}/class-ranking`)
    },

    getClassTeachers({pageNum: pageNum, perPage: perPage}) {

        if(!pageNum) pageNum = 1;
        if(!perPage) perPage = 50;

        return Repository.get(`${resource}/teachers?page=${pageNum}&per_page=${perPage}`)
    },

    getClassmates() {
        return Repository.get(`${resource}/classmates`)
    }


}
