import Repository from "@/repositories/Repository";

const resource = '/submissions'

export default {

    find(submissionID) {
        return Repository.get(`${resource}/${submissionID}/details`)
    },

    // store({assignmentID: assignmentID, answerType: answerType, answerContent: answerContent, remarks: remarks, otherInfo}) {
    store(args){

        let formData = new FormData()

        formData.append('assignment_id', args.assignmentID);
        formData.append('remarks', args.remarks);
        formData.append('mysoalan_all', args.mysoalan_all);
        formData.append('mysoalan_correct', args.mysoalan_correct);
        formData.append('mysoalan_result_uuid', args.mysoalan_result_uuid);
        formData.append('mysoalan_result', JSON.stringify(args.mysoalan_result) );

        if (args.answerType === 'written') {
            formData.append('written_answer', args.answerContent)
        }
        if (args.answerType === 'snapped') {
            args.answerContent.forEach(function (file, index) {
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
    },

    update({
               submissionID: submissionID,
               assignmentID: assignmentID,
               answerType: answerType,
               answerContent: answerContent,
               remarks: remarks
           }) {

        let formData = new FormData()

        formData.append('assignment_id', assignmentID)
        formData.append('remarks', remarks)

        if (answerType === 'written') {
            formData.append('written_answer', answerContent)
        }
        if (answerType === 'snapped') {

            // Process toRemove Snapped Answers
            formData.append('to_remove', answerContent.toRemove.join())

            answerContent.toAdd.forEach(function (file, index) {
                formData.append(`snap_answer[${index}]`, file);
            });
        }

        return Repository.post(`${resource}/${submissionID}/update`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    },

    convertToDataURL(path) {
        return Repository.post(
            `/data-url`, {
                image_path: path
            }
        );
    }
}
