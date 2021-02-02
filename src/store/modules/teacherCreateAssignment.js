import TeacherRepository from "@/repositories/TeacherRepository";
import moment from "moment";
import Repository from "@/repositories/Repository";
import getters from "@/store/getters";
import {get} from "v-calendar/src/utils/_";

export default {
    namespaced: true,
    state: () => ({

        // STATES
        states: {
            isMain: true,
            isCreatingQuestion: false,
            isSelectingDuration: false,
            isSelectingQuestionType: false,
            isWritingQuestion: false,
            isSnappingQuestion: false,
            isCroppingSnappedQuestion: false,
            isResettingQuestion: false,
            isShowingScheduler: false,
            isPublishing: false,
            isPublished: false,
            isShowingError: false
        },

        // Main details to be submitted
        assignmentDetails: {
            title: null,
            subject_id: "",
            classroom_id: null,
            due_datetime: null,
            question: {
                type: null,
                title: null,
                writtenQuestion: null,
                snappedQuestions: [],
                snappedPreviews: []
            },
            published_at: moment(),
        },

        // Questions' draft, serve as temporary save point while creating question.
        // When draft is saved, load into assignment details
        questionDraft: {
            type: null,
            title: null,
            writtenQuestion: null,
            snappedQuestions: [],
            snappedPreviews: [],
        },

        // Currently creating question details. To be used instantaneous.
        // When saved, load into question draft
        creatingQuestionDetails: {
            type: null,
            title: null,
            writtenQuestion: null,
            snappedQuestions: [],
            snappedPreviews: [],
        },

        selectables: {
            subjects: [],
            classrooms: []
        },

        errors: []
    }),
    mutations: {
        toggleCreatingQuestionMode(state) {

            state.states.isMain = !state.states.isMain;
            state.states.isCreatingQuestion = !state.states.isCreatingQuestion;
            state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
        },

        cancelCreatingQuestionMode(state) {
            state.states.isMain = true;
            state.states.isCreatingQuestion = false;
            state.states.isSelectingQuestionType = false;
            state.states.isWritingQuestion = false;
            state.states.isSnappingQuestion = false;
        },

        beginEditingQuestionMode(state, savedQuestionType) {
            state.states.isMain = false;
            state.states.isCreatingQuestion = true;
            state.states.isSelectingQuestionType = false;
            state.states.isEditingQuestion = true;

            state.states.isSnappingQuestion = savedQuestionType === 'snapped';
        },

        beginEditingWrittenQuestionMode(state){
            state.states.isSelectingQuestionType = false;
            state.states.isWritingQuestion = true;
        },

        toggleSelectingDurationMode(state) {
            state.states.isSelectingDuration = !state.states.isSelectingDuration
        },

        toggleWritingQuestionMode(state) {
            state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
            state.states.isWritingQuestion = !state.states.isWritingQuestion;
        },

        toggleSnappingQuestionMode(state) {
            state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
            state.states.isSnappingQuestion = !state.states.isSnappingQuestion;
        },

        toggleShowingErrorMode(state) {
            state.states.isShowingError = !state.states.isShowingError;
        },

        toggleShowingSchedulerMode(state) {
            state.states.isShowingScheduler = !state.states.isShowingScheduler
        },

        togglePublishingMode(state) {
            state.states.isPublishing = !state.states.isPublishing
        },

        togglePublishedMode(state) {
            state.states.isPublished = !state.states.isPublished
        },

        toggleIsSelectingDuration(state) {
            state.states.isSelectingDuration = !state.states.isSelectingDuration;
        },

        toggleSnappedQuestionPreviewStatus(state, key) {
            state.creatingQuestionDetails.snappedPreviews[key].preview = !state.creatingQuestionDetails.snappedPreviews[key].preview;
            state.creatingQuestionDetails.snappedPreviews[key].cropping = false;
        },

        toggleCroppingSnappedQuestionMode(state, key) {
            state.creatingQuestionDetails.snappedPreviews[key].preview = !state.creatingQuestionDetails.snappedPreviews[key].preview;
            state.creatingQuestionDetails.snappedPreviews[key].cropping = !state.creatingQuestionDetails.snappedPreviews[key].cropping;
        },

        saveQuestionToDraft(state) {
            state.questionDraft = {
                type: JSON.parse(JSON.stringify(state.creatingQuestionDetails.type)),
                title: JSON.parse(JSON.stringify(state.creatingQuestionDetails.title)),
                writtenQuestion: JSON.parse(JSON.stringify(state.creatingQuestionDetails.writtenQuestion)),
                snappedQuestions: JSON.parse(JSON.stringify(state.creatingQuestionDetails.snappedQuestions)),
                snappedPreviews: JSON.parse(JSON.stringify(state.creatingQuestionDetails.snappedPreviews)),
            }
        },

        saveQuestionToAssignmentDetails(state) {
            state.assignmentDetails.question = {
                type: JSON.parse(JSON.stringify(state.questionDraft.type)),
                title: JSON.parse(JSON.stringify(state.questionDraft.title)),
                writtenQuestion: JSON.parse(JSON.stringify(state.questionDraft.writtenQuestion)),
                snappedQuestions: JSON.parse(JSON.stringify(state.questionDraft.snappedQuestions)),
                snappedPreviews: JSON.parse(JSON.stringify(state.questionDraft.snappedPreviews)),
            }
        },

        resetCreatingQuestion(state) {

            state.questionDraft = {
                type: null,
                title: null,
                writtenQuestion: null,
                snappedQuestions: [],
                snappedPreviews: []
            }

            state.creatingQuestionDetails = {
                type: null,
                title: null,
                writtenQuestion: null,
                snappedQuestions: [],
                snappedPreviews: []
            }
        },

        loadSavedQuestionForEdit(state, type) {

            state.questionDraft = {
                type: type,
                title: JSON.parse(JSON.stringify(state.assignmentDetails.question.title)),
                writtenQuestion: JSON.parse(JSON.stringify(state.assignmentDetails.question.writtenQuestion)),
                snappedQuestions: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedQuestions)),
                snappedPreviews: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedPreviews))
            }

            state.creatingQuestionDetails = {
                type: type,
                title: JSON.parse(JSON.stringify(state.assignmentDetails.question.title)),
                writtenQuestion: JSON.parse(JSON.stringify(state.assignmentDetails.question.writtenQuestion)),
                snappedQuestions: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedQuestions)),
                snappedPreviews: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedPreviews))
            }
        },


        initialise(state) {

            // STATES
            state.states = {
                isMain: true,
                isCreatingQuestion: false,
                isSelectingDuration: false,
                isSelectingQuestionType: false,
                isWritingQuestion: false,
                isSnappingQuestion: false,
                isCroppingSnappedQuestion: false,
                isResettingQuestion: false,
                isShowingScheduler: false,
                isPublishing: false,
                isPublished: false,
                isShowingError: false
            };

            // Main details to be submitted
            state.assignmentDetails = {
                title: null,
                subject_id: "",
                classroom_id: null,
                due_datetime: null,
                question: {
                    type: null,
                    title: null,
                    writtenQuestion: null,
                    snappedQuestions: []
                },
                published_at: moment(),
            }

            // Questions' draft, serve as temporary save point while creating question.
            // When draft is saved, load into assignment details
            state.questionDraft = {
                type: null,
                title: null,
                writtenQuestion: null,
                snappedQuestions: [],
                snappedPreviews: [],
            }

            // Currently creating question details. To be used instantaneous.
            // When saved, load into question draft
            state.creatingQuestionDetails = {
                type: null,
                title: null,
                writtenQuestion: null,
                snappedQuestions: [],
                snappedPreviews: [],
            }

            state.selectables = {
                subjects: [],
                classrooms: []
            }
        }

    },
    actions: {

        selectQuestionType(type) {
            if (type === 'snapped') {
                this.isSnappingQuestion = true;
                this.isSelectingQuestionType = false;
                this.questionDetails.type = 'snapped';
            }
        },

        beginWritingQuestion({state, commit, getters}) {
            commit('toggleWritingQuestionMode')
            state.creatingQuestionDetails.type = 'written';
        },

        saveWrittenQuestionToDraft({state, commit, getters}) {

            if (state.creatingQuestionDetails.writtenQuestion) {
                commit('toggleWritingQuestionMode')
                commit('saveQuestionToDraft')
            } else {
                commit('toggleShowingErrorMode')
            }
        },

        // Exits writing question mode and return to Create/Edit question
        // If written draft exist, reload it into creatingQuestionDetails
        // Else, empty the creatingQuestionDetails and trigger Select Question mode
        endWritingQuestion({state, getters, commit}) {

            commit('toggleWritingQuestionMode')

            if (state.states.isSelectingQuestionType && getters.hasWrittenQuestionDraft) {
                state.creatingQuestionDetails.type = 'written';
                state.creatingQuestionDetails.writtenQuestion = JSON.parse(JSON.stringify(state.questionDraft.writtenQuestion))

            } else {
                state.creatingQuestionDetails.writtenQuestion = '';
                state.creatingQuestionDetails.type = null;
            }
        },

        removeWrittenQuestionDraft({state, getters, commit}) {
            commit('resetCreatingQuestion')
        },

        beginSnappingQuestion({state, getters, commit}) {
            if (!state.states.isSnappingQuestion) {
                commit('toggleSnappingQuestionMode');
                state.creatingQuestionDetails.type = 'snapped';
            }
        },

        handleSnapQuestion({state, getters, commit, dispatch}, e) {

            let files = e.target.files || e.dataTransfer.files

            if (!files.length) {
                return
            }

            let fileList = Array.prototype.slice.call(e.target.files);

            fileList.forEach(f => {

                if (!f.type.match("image.*")) {
                    return;
                }

                let reader = new FileReader();

                reader.onload = (e) => {

                    state.creatingQuestionDetails.snappedQuestions.push(e.target.result)

                    state.creatingQuestionDetails.snappedPreviews.push({
                        source: e.target.result,
                        preview: false,
                        cropping: false
                    });
                }

                reader.readAsDataURL(f);
            });
        },


        saveCroppedSnappedQuestion({state, commit}, payload) {

            state.creatingQuestionDetails.snappedPreviews[payload.key].source = payload.dataURL
            state.creatingQuestionDetails.snappedQuestions[payload.key] = payload.dataURL
            commit('toggleCroppingSnappedQuestionMode', payload.key);

        },

        removeSnappedQuestion({state, commit}, key) {

            state.creatingQuestionDetails.snappedQuestions.splice(key, 1);
            state.creatingQuestionDetails.snappedPreviews.splice(key, 1);

            if (!state.creatingQuestionDetails.snappedQuestions.length) {
                commit('resetCreatingQuestion')
                commit('toggleSnappingQuestionMode')
            }
        },

        // MODE: MODAL
        closeToggleDuration() {
            if (this.durationDay === '') {
                this.durationDay = 0
            }
            if (this.durationHour === '') {
                this.durationHour = 0
            }
            if (this.durationMinute === '') {
                this.durationMinute = 0
            }

            this.toggleDuration = !this.toggleDuration
        },
        getSubjects({state}) {

            TeacherRepository.getTeacherSubjects()
                .then(response => {

                    if (response.data.success) {
                        const data = response.data.data
                        const numOfSubjects = data.length

                        for (let i = 0; i < numOfSubjects; i++) {

                            let item = data[i];

                            let subjectDetail = {
                                id: item.subject_id,
                                name: item.subject_name
                            }

                            state.selectables.subjects.push(subjectDetail);
                        }
                    }

                })
        },
        getClasses({state, commit}) {
            TeacherRepository.getTeacherClasses()
                .then(response => {

                    if (response.data.success) {

                        const data = response.data.data

                        for (let i = 0; i < data.length; i++) {

                            let item = data[i];

                            let classDetail = {
                                id: item.class_id,
                                name: item.class_name,
                                numOfStudents: item.num_of_students,
                                isHomeroom: item.homeroom
                            }
                            state.selectables.classrooms.push(classDetail)
                        }
                    }

                })
        },

        // updateShowManualDescription() {
        //   this.showDescription = !this.showDescription
        //   this.isCreatingQuestion = !this.isCreatingQuestion;
        // },

        handleQuestionDetails(details) {
            this.questionDetails = details;
        },

        saveQuestion({state, getters, commit}) {

            // Check if user selected a type of question
            if (state.creatingQuestionDetails.type) {

                // Check if user has inserted a question title
                if (state.creatingQuestionDetails.title) {

                    // If user opt to Write Question
                    if (getters.creatingQuestionType === 'written') {

                        if (getters.hasWrittenQuestionDraft) {
                            commit('saveQuestionToAssignmentDetails');
                            commit('resetCreatingQuestion')
                            commit('toggleCreatingQuestionMode')
                        } else {
                            console.log('please write something')
                        }
                    }

                    // If user opt to Snap Question
                    if (getters.creatingQuestionType === 'snapped') {

                        commit('saveQuestionToDraft')

                        if (getters.hasSnappedQuestionDraft) {
                            commit('saveQuestionToAssignmentDetails');
                            commit('resetCreatingQuestion')
                            commit('toggleCreatingQuestionMode')
                        } else {
                            console.log('please snap something')
                        }
                    }

                } else {
                    console.log('please fill in title')
                }
            } else {
                console.log('Please select a type of question.')
            }
        },

        editSavedQuestion({state, commit, getters}) {

            let type = getters.savedQuestionType

            commit('beginEditingQuestionMode', type)
            commit('loadSavedQuestionForEdit', type)
        },

        cancelCreatingQuestion({state, commit, type}) {

            if (!getters.hasSavedQuestion) {
                commit('resetCreatingQuestion')
            }

            commit('cancelCreatingQuestionMode')

        }
        ,
        checkForm({state, commit, getters}) {

            // Reset error
            state.errors = [];

            if (!state.assignmentDetails.title) {
                state.errors.push('Title required.');
            }
            if (!state.assignmentDetails.subject_id) {
                state.errors.push('Subject required.');
            }
            if (!state.assignmentDetails.classroom_id) {
                state.errors.push('Classroom required.');
            }
            if (!getters.hasSavedQuestion) {
                state.errors.push('Question required.');
            }
            if (!state.assignmentDetails.due_datetime) {
                state.errors.push('Due date required');
            }

            if (state.errors.length) {
                commit('toggleShowingErrorMode')
            }
        }
        ,
        sendData({state, commit, getters, dispatch}) {

            dispatch('checkForm');

            if (!getters.hasErrors) {

                let counter = 0;

                if (state.states.isShowingScheduler) {
                    commit('toggleShowingSchedulerMode')
                }

                commit('togglePublishingMode')

                state.assignmentDetails.classroom_id.forEach((classroom, index) => {

                    let formData = new FormData();

                    formData.append('subject_id', state.assignmentDetails.subject_id);
                    formData.append('class_id', classroom.id);
                    formData.append('title', state.assignmentDetails.title);
                    formData.append('written_question_title', state.assignmentDetails.question.title);
                    formData.append('written_description', state.assignmentDetails.question.writtenQuestion ?? '');
                    formData.append('due_datetime', moment(state.assignmentDetails.due_datetime).format('YYYY-MM-DD HH:mm:ss'));
                    formData.append('published_at', moment(state.assignmentDetails.published_at).format('YYYY-MM-DD HH:mm:ss'));
                    formData.append('remarks', state.assignmentDetails.remarks ?? '');

                    for (let i = 0; i < state.assignmentDetails.question.snappedQuestions.length; i++) {
                        let file = state.assignmentDetails.question.snappedQuestions[i];
                        formData.append('snap_question[' + i + ']', file);
                    }

                    Repository.post('/assignments/store',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            if (response.data.success) {
                                counter++;

                                if (counter === state.assignmentDetails.classroom_id.length) {
                                    commit('togglePublishingMode')
                                    commit('togglePublishedMode')
                                }
                            } else {
                                counter++;
                                if (counter === state.assignmentDetails.classroom_id.length) {
                                    commit('toggleShowingErrorMode')
                                }
                            }

                        })
                        .catch(error => {
                            commit('togglePublishingMode')
                            commit('toggleShowingErrorMode')
                        });
                });
            }
        }
        ,
        getDetails: function () {
            TeacherRepository.getTeacherDetails()
                .then(response => {

                    if (response.data.success) {

                        const data = response.data.data[0]

                        let teacherDetail = {
                            id: data.id,
                        }

                        localStorage.setItem('teacherID', teacherDetail.id)
                    }
                })
        }
    },
    getters: {

        creatingQuestionType: (state) => {
            return state.creatingQuestionDetails.type;
        },

        savedQuestionType: (state) => {
            return state.assignmentDetails.question.type;
        },

        dueDateTime(state) {
            return moment(state.assignmentDetails.due_datetime).format('DD/MM/YYYY')
        },

        snappedPreviews(state) {
            return state.assignmentDetails.question.snappedQuestions;
        },

        hasSavedQuestion: (state) => {
            return state.assignmentDetails.question.type && (state.assignmentDetails.question.writtenQuestion || state.assignmentDetails.question.snappedQuestions.length);
        },

        hasSavedDueDatetime: (state) => {
            return state.assignmentDetails.due_datetime !== null;
        },

        hasEditableQuestion(state, getters) {
            return state.states.isCreatingQuestion && !state.states.isWritingQuestion && (getters.hasWrittenQuestionDraft || getters.hasSnappedQuestionDraft)
        },

        hasWrittenQuestionDraft: (state) => {
            return state.questionDraft.type ? (state.questionDraft.type === 'written' && state.questionDraft.writtenQuestion) : false;
        },

        hasSnappedQuestionDraft(state) {
            return state.questionDraft.type ? state.questionDraft.type === 'snapped' && state.questionDraft.snappedQuestions.length > 0 : false;
        },

        hasErrors(state) {
            return state.errors.length || state.states.isShowingError
        }

    }
}
