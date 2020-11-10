import Repository from "@/repositories/Repository";

const resource = '/assignments'

export default  {

    all() {
        return Repository.post(`${resource}`, {
            "filters": {
                "is_active": false,
                "month": null,
                "year": null,
                "subjects": null
            }
        })
    },

    find(assignmentID) {
        return Repository.get(`${resource}/${assignmentID}/submissions`)
    }
}
