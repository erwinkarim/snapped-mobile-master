import Repository from "@/repositories/Repository";

const resource = '/marks'

export default {

    create({assignmentID: assignmentID, studentID: studentID, answerID: answerID, snappedAnswers: snappedAnswers, marks: marks, feedback: feedback}) {

        let formData = new FormData()

        formData.append('assignment_id', assignmentID)
        formData.append('student_id', studentID)
        formData.append('answer_id', answerID)
        formData.append('marks', marks)
        formData.append('feedback', feedback)

        // TODO: To add Snapped Answer

        return Repository.post(`${resource}/store`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    }
}
