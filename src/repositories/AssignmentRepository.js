import Repository from "@/repositories/Repository";

const resource = '/assignments'

export default  {

    find(assignmentID) {
        return Repository.get(`${resource}/${assignmentID}/submissions`)
    }
}
