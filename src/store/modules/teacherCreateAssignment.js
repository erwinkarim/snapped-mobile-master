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
            isPublishing: false,
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
                snappedQuestions: []
            },
            remarks: ''
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

        // /***********
        //  * STATES *
        //  ***********/
        // disabled: false,
        // //show page
        // showAssignment: true,
        // showDescription: false,
        // //toggle modal duration or schedule
        // toggleDuration: false,
        // toggleSchedule: false,
        // //toggle preview gambar
        //
        // //toggle modal success assignment
        // published: false,
        // //toggle modal error assignment
        // error: false,
        // errors: [],
        //
        // //assignment page data
        // teacherID: localStorage.getItem('teacherID'),
        // title: '',
        // subject_id: '',
        // classroom_id: [],
        // subjects: '',
        // classrooms: [],
        // //schedule publish
        // published_at: new Date,
        // masks: {
        //     input: 'DD-MM-YYYY h:mm A',
        // },
        // today: new Date,
        // due_datetime: '',
        // durationDay: 0,
        // durationHour: 0,
        // durationMinute: 0,
        // remarks: '',
        //
        // //question page data
        // //title question
        // titleQuestion: '',
        // titleQuestionConfirmed: '',
        // //description question
        // descriptionQuestion: '',
        // descriptionConfirmed: '',
        // // images data (untuk display gambar)
        // images: [],
        // imagesConfirmed: [],
        // // images details to be uploaded to backed
        // snappedQuestions: [],
        // snappedQuestionsConfirmed: [],
        // //untuk view image one by one (preview page)
        // previewImage: [],
    }),
    mutations: {
        toggleCreatingQuestionMode(state) {
            state.states.isMain = !state.states.isMain;
            state.states.isCreatingQuestion = !state.states.isCreatingQuestion;
            state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
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
            console.log(`ERROR: ${state.states.isShowingError}`)
        },

        saveQuestionToDraft(state) {
            state.questionDraft = {
                type: state.creatingQuestionDetails.type,
                title: state.creatingQuestionDetails.title,
                writtenQuestion: state.creatingQuestionDetails.writtenQuestion,
                snappedQuestions: state.creatingQuestionDetails.snappedQuestions,
                snappedPreviews: state.creatingQuestionDetails.snappedPreviews,
            }
        },

        saveQuestionToAssignmentDetails(state) {
            state.assignmentDetails.question = {
                type: state.questionDraft.type,
                title: state.questionDraft.title,
                writtenQuestion: state.questionDraft.writtenQuestion,
                snappedQuestions: state.questionDraft.snappedQuestions,
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

        loadSavedQuestionForEdit(state) {
            state.questionDraft = {
                type: state.assignmentDetails.question.type,
                title: state.assignmentDetails.question.title,
                writtenQuestion: state.assignmentDetails.question.writtenQuestion,
                snappedQuestions: state.assignmentDetails.question.snappedQuestions
            }

            state.creatingQuestionDetails = {
                type: state.assignmentDetails.question.type,
                title: state.assignmentDetails.question.title,
                writtenQuestion: state.assignmentDetails.question.writtenQuestion,
                snappedQuestions: state.assignmentDetails.question.snappedQuestions
            }
        },

        toggleSnappedQuestionPreviewStatus(state, key) {
            state.creatingQuestionDetails.snappedPreviews[key].preview = !state.creatingQuestionDetails.snappedPreviews[key].preview;
            state.creatingQuestionDetails.snappedPreviews[key].cropping = false;
        },

        //MULTISELECT
        // addClassroom(state, classroom) {
        //
        //     console.log(classroom)
        //     const tag = {
        //         name: classroom,
        //         code: classroom.substring(0, 2) + Math.floor((Math.random() * 10000000))
        //     }
        //     this.options.push(tag)
        //     this.value.push(tag)
        // },
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
                state.creatingQuestionDetails.writtenQuestion = state.questionDraft.writtenQuestion
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

            for (let i = 0; i < files.length; i++) {
                state.creatingQuestionDetails.snappedQuestions.push(files[i])
            }

            let fileList = Array.prototype.slice.call(e.target.files);

            fileList.forEach(f => {

                if (!f.type.match("image.*")) {
                    return;
                }

                let reader = new FileReader();

                reader.onload = (e) => {
                    state.creatingQuestionDetails.snappedPreviews.push({
                        source: e.target.result,
                        preview: false,
                        cropping: false
                    });
                }

                reader.readAsDataURL(f);
            });

            console.log(state.creatingQuestionDetails.snappedPreviews)
        },


        beginCropSnappedQuestion(key) {
            this.snappedPreviews[key].preview = false;
            this.snappedPreviews[key].cropping = true;
        },
        saveCroppedSnappedQuestion(key) {
            let cropper = `cropper_${key}`
            this.snappedPreviews[key].source = this.$refs[cropper][0].getCroppedCanvas().toDataURL()
            this.questionDetails.snappedQuestions[key] = this.$refs[cropper][0].getCroppedCanvas().toDataURL()

            this.snappedPreviews[key].preview = true;
            this.snappedPreviews[key].cropping = false;
        },

        removeSnappedQuestion({state, commit}, key) {

            state.creatingQuestionDetails.snappedQuestions.splice(key, 1);
            state.creatingQuestionDetails.snappedPreviews.splice(key, 1);

            if (!state.creatingQuestionDetails.snappedQuestions.length) {
                commit('resetCreatingQuestion')
                commit('toggleSnappingQuestionMode')
            }
        },
        //
        // resetQuestion(state) {
        //
        //     this.isResettingQuestion = true;
        //
        //     this.questionDetails.title = null;
        //     this.questionDetails.type = null;
        //     this.questionDetails.writtenQuestion = null;
        //     this.questionDetails.snappedQuestions = [];
        //
        //     this.isSelectingQuestionType = true;
        // },


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
        getSubjects() {
            TeacherRepository.getTeacherSubjects()
                .then(response => {

                    if (response.data.success) {
                        const data = response.data.data

                        const numOfSubjects = data.length

                        this.subjects = []
                        for (let i = 0; i < numOfSubjects; i++) {

                            let item = data[i];

                            let subjectDetail = {
                                id: item.subject_id,
                                name: item.subject_name
                            }

                            this.subjects.push(subjectDetail)
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
            console.log(`Updated question details`)
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

                        console.log('is saving snapped question');

                        if (getters.hasSavedSnappedQuestion) {
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
            commit('toggleCreatingQuestionMode')
            commit('loadSavedQuestionForEdit')
        },

        cancelCreatingQuestion({state, commit, getters}) {

            if (!getters.hasSavedQuestion) {
                commit('resetCreatingQuestion')
            }

            commit('toggleCreatingQuestionMode')


            // if (this.titleQuestionConfirmed && (this.descriptionConfirmed || this.imagesConfirmed)) {
            //     this.titleQuestion = this.titleQuestionConfirmed
            //     this.descriptionQuestion = this.descriptionConfirmed
            //     this.images = []
            //     for (var i = 0; i < this.imagesConfirmed.length; i++) {
            //         this.images.push(this.imagesConfirmed[i])
            //     }
            //
            //     this.snappedQuestions = []
            //     for (var i = 0; i < this.snappedQuestionsConfirmed.length; i++) {
            //         this.snappedQuestions.push(this.snappedQuestionsConfirmed[i])
            //     }
            // } else {
            //     this.titleQuestion = ''
            //     this.descriptionQuestion = ''
            //     this.images = []
            //     this.snappedQuestions = []
            // }

            // this.toggleCreatingQuestionMode()
        },
        removeDescription() {
            this.descriptionQuestion = ''
        }
        ,
        // onFileSelected(e) {
        //   var files = e.target.files || e.dataTransfer.files
        //
        //   if (!files.length) {
        //     return
        //   }
        //
        //   for (var i = 0; i < files.length; i++) {
        //     this.snappedQuestions.push(files[i])
        //   }
        //
        //   let fileList = Array.prototype.slice.call(e.target.files);
        //   fileList.forEach(f => {
        //
        //     if (!f.type.match("image.*")) {
        //       return;
        //     }
        //
        //     let reader = new FileReader();
        //     let that = this;
        //
        //     reader.onload = function (e) {
        //       that.images.push(e.target.result);
        //       that.selectedFile = event.target.result
        //       that.$refs.cropper.replace(this.selectedFile)
        //     }
        //     reader.readAsDataURL(f);
        //   });
        // },
        previewAssignment(key) {
            this.previewImage = this.images[key]
            this.isCreatingQuestion = !this.isCreatingQuestion
            this.isPreviewing = !this.isPreviewing
        }
        ,
        removeImage(key) {
            this.images.splice(key, 1);
            this.snappedQuestions.splice(key, 1);
        }
        ,
        format_date2(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        }
        ,
        format_date(value) {
            if (value) {
                return moment(String(value)).format('YYYY-MM-DD HH:mm:ss')
            }
        }
        ,
        format_time(value) {
            if (value) {
                return moment(String(value)).format('HH:mm')
            }
        }
        ,
        checkForm() {
            // if (this.title && this.subject_id && this.classroom_id && this.titleQuestion
            //     && (this.snappedQuestions.length || this.descriptionQuestion) && !this.due_datetime) {
            //   return (true);
            // }

            this.errors = [];

            if (!this.title) {
                this.errors.push('Title required.');
            }
            if (!this.subject_id) {
                this.errors.push('Subject required.');
            }
            if (!this.classroom_id) {
                this.errors.push('Classroom required.');
            }
            if (!this.titleQuestion && !(this.snappedQuestions.length || this.descriptionQuestion)) {
                this.errors.push('Question required.');
            }
            if (!this.due_datetime) {
                this.errors.push('Due date required');
            }

            // e.preventDefault();
        }
        ,
        sendData(e) {

            this.checkForm();
            if (this.errors.length === 0) {

                var ctr = 0;

                this.classroom_id.forEach((value, index) => {

                    let formData = new FormData();

                    // let dayInMinute = this.durationDay * 1440
                    // let hourInMinute = this.durationHour * 60
                    // //in minutes
                    // let totalDuration = dayInMinute + hourInMinute + this.durationMinute
                    //
                    // let due_datetime = moment(this.published_at).add(totalDuration, 'm').toDate();

                    formData.append('teacher_id', this.teacherID);
                    formData.append('subject_id', this.subject_id);
                    formData.append('class_id', value.id);
                    formData.append('title', this.title);
                    formData.append('written_question_title', this.titleQuestion);
                    formData.append('written_description', this.descriptionQuestion);
                    formData.append('due_datetime', this.format_date(this.due_datetime));
                    formData.append('published_at', this.format_date(this.published_at));
                    formData.append('remarks', this.remarks);

                    for (var i = 0; i < this.snappedQuestions.length; i++) {
                        let file = this.snappedQuestions[i];

                        formData.append('snap_question[' + i + ']', file);
                    }

                    if (this.toggleSchedule) {
                        this.toggleSchedule = !this.toggleSchedule
                    }

                    this.isPublishing = true;

                    Repository.post('/assignments/store',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {

                            this.isPublishing = false;

                            if (response.data.success) {
                                ctr++;
                                if (ctr === this.classroom_id.length) {
                                    this.published = !this.published
                                }
                            } else {
                                ctr++;
                                if (ctr === this.classroom_id.length) {
                                    this.error = !this.error
                                }
                            }
                        })
                        .catch(error => {
                            // error.push("error");
                            this.isPublishing = false;

                            this.error = !this.error
                        });
                });
            } else {
                this.error = !this.error
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

        showQuestionOptions: function () {
            this.images.length;
            this.descriptionQuestion;
            return this.images.length || this.descriptionQuestion;
        },
        noDuration: function () {
            this.durationDay;
            this.durationHour;
            this.durationMinute;
            return this.durationDay <= 0 && this.durationHour <= 0 && this.durationMinute <= 0;
        },
        duration: function () {
            const dayInHour = this.durationDay * 24
            let hours = parseInt(this.durationHour) + parseInt(dayInHour)
            let minutes = parseInt(this.durationMinute)

            if (hours < 10) {
                hours = '0' + hours
            }

            if (minutes < 10) {
                minutes = '0' + minutes
            }

            let duration = hours + ':' + minutes + ':00'

            return duration;
        },

        hasSavedQuestion: (state) => {
            return state.assignmentDetails.question.type && (state.assignmentDetails.question.writtenQuestion || state.assignmentDetails.question.snappedQuestions.length);
        },

        hasSavedDueDatetime: (state) => {
            return state.assignmentDetails.due_datetime !== null;
        },

        hasEditableQuestion(state, getters) {
            return state.states.isCreatingQuestion && !state.states.isWritingQuestion && !state.states.isSnappingQuestion && (getters.hasWrittenQuestionDraft || getters.hasSavedSnappedQuestion)
        },

        hasWrittenQuestionDraft: (state) => {
            console.log(`has written draft ${(state.questionDraft.type === 'written' && state.questionDraft.writtenQuestion)}`)
            return state.questionDraft.type ? (state.questionDraft.type === 'written' && state.questionDraft.writtenQuestion) : false;
        },

        hasSavedSnappedQuestion(state) {
            // console.log(`hasSavedSnapped: ${this.savedQuestionDetails.type ? this.savedQuestionDetails.type === 'snapped' && this.savedQuestionDetails.snappedQuestions.length : false}`)
            // console.log(`previews: ${this.snappedPreviews.length}`)
            return state.assignmentDetails.question.type ? state.assignmentDetails.question.type === 'snapped' && state.assignmentDetails.question.snappedQuestions.length : false;
        }

    }
}
