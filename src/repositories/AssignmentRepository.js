import Repository from "@/repositories/Repository";

const resource = '/assignments'

export default  {


    all({is_active: isActive, date: date, month: month, year: year, subjects: subjects}) {

        return Repository.post('/assignments', {
            filters: {
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

    find(assignmentID) {
        return Repository.get(`${resource}/${assignmentID}/submissions`)
    },

    getDueDates(){
        return Repository.get('/duedates')
    }
}
