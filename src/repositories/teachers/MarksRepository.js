import Repository from "@/repositories/Repository";

const resource = '/marks'

export default {

    find(id) {
        return Repository.get(`${resource}/show/${id}`);
    },

    store({
              assignmentID: assignmentID,
              studentID: studentID,
              answerID: answerID,
              submissionType: submissionType,
              snappedAnswers: snappedAnswers,
              marks: marks,
              feedback: feedback
    }) {

        let formData = new FormData()

        formData.append('assignment_id', assignmentID)
        formData.append('student_id', studentID)
        formData.append('answer_id', answerID)
        formData.append('marks', marks)
        formData.append('feedback', feedback)

        if (submissionType === 'snapped') {
            snappedAnswers.forEach(function (dataURL, index) {
                formData.append(`marking_picture[${index}]`, dataURL);
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
