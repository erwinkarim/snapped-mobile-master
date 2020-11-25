import Repository from "@/repositories/Repository";

const resource = '/submissions'

export default {

    find(submissionID) {
        return Repository.get(`${resource}/${submissionID}/details`)
    },

    store({assignmentID: assignmentID, answerType: answerType, answerContent: answerContent, remarks: remarks}) {

        let formData = new FormData()

        formData.append('assignment_id', assignmentID)
        formData.append('remarks', remarks)

        if (answerType === 'written') {
            formData.append('written_answer', answerContent)
        }
        if (answerType === 'snapped') {
            answerContent.forEach(function (file, index) {
                formData.append(`snap_answer[${index}]`, file);
            });
        }

        return Repository.post(`${resource}/store`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    }
}
