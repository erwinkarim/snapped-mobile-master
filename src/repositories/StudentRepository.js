import Repository from "@/repositories/Repository";

const resource = '/students'
const token = localStorage.getItem('token')

export default {

    getStudentDetails() {
        return Repository.post('/details', {
            headers: {
                Accept: "application/json",
                Authorization: 'Bearer ' + token,
            }
        })
    },

    getReportCard() {
        return Repository.get('/students/report-card', {
            headers: {
                Accept: "application/json",
                Authorization: 'Bearer ' + token,
            },
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

    getBatchRanking({pageNum: pageNum, perPage: perPage, search: search}) {

        if (!pageNum) pageNum = 1;
        if (!perPage) perPage = 50;
        if (!search) search = '';

        return Repository.get(`/rankings?page=${pageNum}&per_page=${perPage}&search=${search}`)
    },

    getNationalRanking({pageNum: pageNum, perPage: perPage, search: search}) {

        if (!pageNum) pageNum = 1;
        if (!perPage) perPage = 50;
        if (!search) search = '';

        return Repository.get(`/national-rankings?page=${pageNum}&per_page=${perPage}&search=${search}`)
    },

    getClassRanking() {
        return Repository.get(`${resource}/class-ranking`)
    },

    getClassTeachers({pageNum: pageNum, perPage: perPage}) {

        if (!pageNum) pageNum = 1;
        if (!perPage) perPage = 50;

        return Repository.get(`${resource}/teachers?page=${pageNum}&per_page=${perPage}`)
    },

    getClassmates() {
        return Repository.get(`${resource}/classmates`)
    },

    getSubjects(){
        return Repository.get(`/subjects`)
    },

    getUnsubmittedAssignmentSummary() {
        return Repository.get(`${resource}/unsubmitted-assignments`)
    },

}
