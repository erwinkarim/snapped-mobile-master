import Repository from "@/repositories/Repository";

const resource = '/submissions'

export default  {
    find(submissionID) {
        return Repository.get(`${resource}/${submissionID}/details`)
    }
}
