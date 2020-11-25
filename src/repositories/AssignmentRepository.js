import Repository from "@/repositories/Repository";

const resource = '/assignments'

export default  {


    all(filters) {
        return Repository.post('/assignments', {
            filters: filters
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

    find(assignmentID) {
        return Repository.get(`${resource}/${assignmentID}/submissions`)
    },

    getDueDates(){
        return Repository.get('/duedates')
    }
}
