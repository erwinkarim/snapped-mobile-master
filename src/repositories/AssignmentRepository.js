import Repository from "@/repositories/Repository";

const resource = '/assignments'

export default {


    all({
            pageNum: pageNum,
            perPage: perPage,
            is_active: isActive,
            date: date,
            month: month,
            year: year,
            subjects: subjects
        }) {

        if (!pageNum) pageNum = 1;
        if (!perPage) perPage = 50;

        return Repository.post(`/assignments?page=${pageNum}`, {
            pageNum: pageNum,
            filters: {
                per_page: perPage,
                is_active: isActive,
                date: date,
                month: month,
                year: year,
                subjects: subjects
            }
        })
    },

    active() {
        return Repository.post('/assignments', {
            filters: {
                is_active: true,
                date: null,
                month: null,
                year: null,
                subjects: null
            }
        })
    },

    getPublishedAssignments() {
        return Repository.post('/assignments', {
            filters: {
                is_active: false,
                date: null,
                month: null,
                year: null,
                subjects: null
            }
        })
    },

    find(assignmentID) {
        return Repository.get(`${resource}/${assignmentID}/submissions`)
    },

    getDueDates() {
        return Repository.get('/duedates')
    },

    update(assignmentID, dueDateTime) {
        return Repository.put(`${resource}/${assignmentID}/update`, {
            due_datetime: dueDateTime
        });
    },

    delete(assignmentID) {
        return Repository.delete(`${resource}/${assignmentID}/delete`);
    }
}
