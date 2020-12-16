import SubmissionRepository from "@/repositories/SubmissionRepository";
import {get} from "v-calendar/src/utils/_";
import router from "@/router";

export default {
    namespaced: true,
    state: () => ({

        states: {
            isLoading: true,
            isMain: true,
            isPreviewing: false,
            isMarking: false,
            isSelectingSticker: false,
            isWritingFeedback: false,
            isShowingModal: false,
            isSavingEditedSnappedAnswer: false
        },

        // Assignment Details
        assignmentDetails: {
            submissionID: null,
            studentID: null,
            studentName: null,
            assignmentID: null,
            assignmentTitle: null,
            snappedAnswerPaths: null,
            writtenAnswer: null,
            createdAt: null,
            updatedAt: null,
            submittedTime: null,
            submittedDate: null,
            marksID: null,
            marks: null,
            markedSnappedAnswerPaths: null
        },

        nowMarking: {
            image: {
                index: null,
                dataURL: null
            },
            sticker: null,
            textBox: false,
        },

        submission: {
            type: '',
            snappedAnswers: [],
            feedback: '',
            marks: null
        }
    }),
    mutations: {

        setAssignmentDetails(state, data) {

            state.assignmentDetails.submissionID = data.submission_id;
            state.assignmentDetails.studentID = data.student_id;
            state.assignmentDetails.studentName = data.student_name;
            state.assignmentDetails.assignmentID = data.assignment_id;
            state.assignmentDetails.assignmentTitle = data.assignment_title;
            state.assignmentDetails.writtenAnswer = data.written_answer;
            state.assignmentDetails.createdAt = data.created_at;
            state.assignmentDetails.updatedAt = data.updated_at;
            state.assignmentDetails.submittedTime = data.submission_time;
            state.assignmentDetails.submittedDate = data.submission_date;
            state.assignmentDetails.marksID = data.marks_id;
            state.assignmentDetails.marks = data.marks;

            if (data.snap_answer) {
                state.submission.type = 'snapped';
                state.assignmentDetails.snappedAnswerPaths = data.snap_answer_data_url.split('|');
            }

            if (data.written_answer) {
                state.submission.type = 'written';
            }

            if (data.marking_picture_url) {
                state.assignmentDetails.markedSnappedAnswerPaths = data.marking_picture_url.split(',');
            }
        },

        togglePreviewMode(state) {
            state.states.isPreviewing = !state.states.isPreviewing;
            state.states.isMain = !state.states.isMain;

            if (state.states.isPreviewing) {
                state.states.isMarking = false;
            }
        },

        resetState(state, option) {
            console.log('reset state')
            state.isLoading = false;
            state.isMain = false;
            state.isPreviewing = false;
            state.isMarking = false;
            state.isSelectingSticker = false;
            state.isWritingFeedback = false;
            state.isShowingModal = false
            state.isSavingEditedSnappedAnswer = false;

            state.states[option] = true;
        }

    },
    actions: {

        // FETCH: Submission Details
        fetchData({state, commit}, submissionID) {

            SubmissionRepository.find(submissionID)
                .then(response => {
                    commit('setAssignmentDetails', response.data.submission_details)
                    state.states.isLoading = false;
                });
            console.log('Done fetching data')
        },

        enterMarkingMode({state, getters, commit}, nowMarking) {

            return new Promise((resolve, reject) => {
                console.log(`isPreviewing: ${state.states.isPreviewing}`)
                console.log(`isMarked: ${ getters.isMarkedAssignment}`)

                if (state.states.isPreviewing && !getters.isMarkedAssignment) {
                    console.log('true')
                    this.nowMarking = nowMarking;
                    commit('resetState', 'isMarking')
                    resolve()
                } else {
                    reject()
                }
            })
        },
    },
    getters: {

        images: (state, getters) => {
            if(getters.hasMarkedSnappedAnswer) {
                return state.assignmentDetails.markedSnappedAnswerPaths
            } else if(getters.hasSnappedAnswer) {
                return state.assignmentDetails.snappedAnswerPaths
            }
        },

        hasWrittenAnswer: (state, getters) => {
            return state.assignmentDetails.writtenAnswer !== null && state.assignmentDetails.writtenAnswer !== undefined;
        },

        hasSnappedAnswer: (state, getters) => {

            return state.assignmentDetails.snappedAnswerPaths !== null && state.assignmentDetails.snappedAnswerPaths !== undefined;
        },

        hasMarkedSnappedAnswer: (state, getters) => {
            return state.assignmentDetails.markedSnappedAnswerPaths !== null && state.assignmentDetails.markedSnappedAnswerPaths !== undefined;
        },

        isMarkedAssignment: (state, getters) => {

            console.log(`Mark ID: ${state.assignmentDetails.marksID}`)
            return state.assignmentDetails.marksID !== null && state.assignmentDetails.marksID !== undefined;
        },
    }
}
