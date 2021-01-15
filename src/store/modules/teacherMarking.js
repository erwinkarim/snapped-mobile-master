import SubmissionRepository from "@/repositories/SubmissionRepository";
import {get} from "v-calendar/src/utils/_";
import router from "@/router";
import {fabric} from "fabric";
import stickers from "@/components/Stickers/Stickers";
import MarksRepository from "@/repositories/teachers/MarksRepository";

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

        // Image being marked (temporary)
        nowMarking: {
            image: {
                index: null,
                path: null,
                dimensions: {
                    height: null,
                    width: null
                }
            },
            sticker: null,
            textBox: false,
            canvas: {
                main: null,
                dimensions: {
                    height: null,
                    width:  null
                }
            },
        },

        // Available stickers
        stickerCollection: [
            'tick-sticker',
            'confused-person-sticker',
            'top-sticker',
            'lets-go-sticker',
            'false-sticker',
            'question-mark-sticker'
        ],

        // Marked images
        marking: [],


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
                state.marking = data.snap_answer_data_url.split('|');
            }

            if (data.written_answer) {
                state.submission.type = 'written';
            }

            if (data.marking_picture_url) {
                state.assignmentDetails.markedSnappedAnswerPaths = data.marking_picture_url.split(',');
            }
        },


        loadCanvas(state) {

            // Initialise canvas with placeholder dimensions. To be resized once loaded image
            state.nowMarking.canvas.main = new fabric.Canvas('canvas', {
                width: state.nowMarking.canvas.dimensions.width,
                height: state.nowMarking.canvas.dimensions.height,
            })
        },

        loadImage(state) {

            // First, get image's dimension. Then, resize canvas while setting background image
            fabric.Image.fromURL(state.nowMarking.image.path, (img, error) => {

                state.nowMarking.image.dimensions.width = img.width;
                state.nowMarking.image.dimensions.height = img.height;

                let scaleFactor = state.nowMarking.canvas.dimensions.width / state.nowMarking.image.dimensions.width;

                // Determine if image is longer than screen height
                let imageIsLongerThanScreenHeight = (scaleFactor * state.nowMarking.image.dimensions.height) > 0.7 * window.innerHeight

                // Set canvas size
                state.nowMarking.canvas.main = new fabric.Canvas('canvas', {
                    width: scaleFactor * state.nowMarking.image.dimensions.width,
                    height: imageIsLongerThanScreenHeight ? scaleFactor * state.nowMarking.image.dimensions.height : 0.7 * window.innerHeight,
                })

                // Store canvas dimension values
                state.nowMarking.canvas.dimensions = {
                    width: scaleFactor * state.nowMarking.image.dimensions.width,
                    height: imageIsLongerThanScreenHeight ? scaleFactor * state.nowMarking.image.dimensions.height : 0.7 * window.innerHeight,
                }

                state.nowMarking.canvas.main.setBackgroundImage(
                    state.nowMarking.image.path,
                    state.nowMarking.canvas.main.renderAll.bind(state.nowMarking.canvas.main),
                    {
                        top: imageIsLongerThanScreenHeight ? 0 : state.nowMarking.canvas.dimensions.height/2,
                        left: state.nowMarking.canvas.dimensions.width/2,
                        originX: 'center',
                        originY: imageIsLongerThanScreenHeight ? 'top' : 'center',
                        scaleX: state.nowMarking.canvas.dimensions.width / state.nowMarking.image.dimensions.width,
                        scaleY: state.nowMarking.canvas.dimensions.width / state.nowMarking.image.dimensions.width
                    },
                    {crossOrigin: 'Anonymous'}
                );
            });
        },

        disposeCanvas(state) {
            state.nowMarking.canvas.main.dispose();
        },

        togglePreviewMode(state) {

            state.states = {
                isLoading: false,
                isMain: !state.states.isMain,
                isPreviewing: !state.states.isPreviewing,
                isMarking: false,
                isSelectingSticker: false,
                isWritingFeedback: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            }
        },

        setMainMode(state) {
            state.states = {
                isLoading: false,
                isMain: true,
                isPreviewing: false,
                isMarking: false,
                isSelectingSticker: false,
                isWritingFeedback: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            }
        },

        setWritingFeedbackMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isMarking: false,
                isSelectingSticker: false,
                isWritingFeedback: true,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            }
        },

        toggleStickerBar(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isMarking: true,
                isSelectingSticker: !state.states.isSelectingSticker,
                isWritingFeedback: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleModalMode(state) {
            state.states = {
                isLoading: false,
                isMain: true,
                isPreviewing: false,
                isMarking: false,
                isSelectingSticker: false,
                isWritingFeedback: false,
                isShowingModal: !state.states.isShowingModal,
                isSavingEditedSnappedAnswer: false
            };
        },

        setMarkingMode(state){
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isMarking: true,
                isSelectingSticker: false,
                isWritingFeedback: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        setOriginalState(state) {

            state.states = {
                isLoading: true,
                isMain: true,
                isPreviewing: false,
                isMarking: false,
                isSelectingSticker: false,
                isWritingFeedback: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };

            // Assignment Details
            state.assignmentDetails = {
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
            };


            // Determine canvas dimensions
            let canvasWidth = 0.9 * window.innerWidth;
            if (window.innerWidth > 700) {
                if (window.innerWidth > 1000) {
                    canvasWidth = 0.5 * window.innerWidth;
                } else {
                    canvasWidth = 0.65 * window.innerWidth;
                }
            }

            state.nowMarking = {
                image: {
                    index: null,
                    path: null,
                    dimensions: {
                        height: null,
                        width: null
                    }
                },
                sticker: null,
                textBox: false,
                canvas: {
                    main: null,
                    dimensions: {
                        height: 0.75 * window.innerHeight,
                        width: canvasWidth
                    }
                },
            };

            // Marked images
            state.marking = [];

            state.submission = {
                type: '',
                snappedAnswers: [],
                feedback: '',
                marks: null
            }

        },
    },
    actions: {

        // FETCH: Submission Details
        fetchData({state, commit}, submissionID) {

            SubmissionRepository.find(submissionID)
                .then(response => {
                    commit('setAssignmentDetails', response.data.submission_details)
                    state.states.isLoading = false;
                });
        },

        enterMarkingMode({state, getters, commit}, nowMarking) {

            return new Promise((resolve, reject) => {

                if (state.states.isPreviewing && !getters.isMarkedAssignment) {

                    state.nowMarking.image.index = nowMarking.index;
                    state.nowMarking.image.path = decodeURIComponent(nowMarking.dataURL);

                    commit('setMarkingMode')

                    resolve()
                } else {
                    reject()
                }
            })
        },

        loadSticker({state, commit}, stickerName) {

            fabric.loadSVGFromString(stickers[stickerName], (objects, options) => {

                let obj = fabric.util.groupSVGElements(objects, options);
                obj.scaleToHeight(state.nowMarking.canvas.dimensions.height / 12)
                    .set({
                        left: state.nowMarking.canvas.dimensions.width / 2,
                        top: state.nowMarking.canvas.dimensions.height / 2
                    })
                    .setCoords();

                state.nowMarking.canvas.main.add(obj).renderAll();
            });

            commit('toggleStickerBar')
        },

        loadTextBox({state}) {

            let oldTop = state.nowMarking.canvas.dimensions.height / 2;
            let oldLeft = window.innerWidth / 2;


            let textBox = new fabric.Textbox('Enter Your Text Here', {
                originX: "center",
                originY: "bottom",
                textAlign: "center",
                fontFamily: "Segoe UI",
                top: state.nowMarking.canvas.dimensions.height / 2,
                left: window.innerWidth / 2,
                fontSize: 24,
                fill: "#F53B57"
            })

            state.nowMarking.canvas.main.add(textBox).setActiveObject(textBox);

            textBox.on("editing:entered", function () {
                oldTop = this.top;
                oldLeft = this.left;

                this.top = state.nowMarking.canvas.dimensions.height / 2;
                this.left = window.innerWidth / 2;
            }).on("editing:exited", function () {
                this.top = oldTop;
                this.left = oldLeft;
            });
        },

        doneEditSnappedAnswer({state, commit}) {

            return new Promise((resolve, reject) => {
                state.marking[state.nowMarking.image.index] = state.nowMarking.canvas.main.toDataURL()
                commit('setMainMode')
                resolve()
            })
        },


        addMark({state, commit}, marks) {
            return new Promise((resolve, reject) => {
                state.submission.marks = marks
                resolve()
            })
        },

        addFeedback({state, commit}, feedback) {
            return new Promise((resolve, reject) => {
                state.submission.feedback = feedback
                resolve()
            })
        },

        undoEditedSnappedAnswer({state, commit, action}) {

            let index = state.nowMarking.image.index;

            // Get original image and set it to nowMarking
            state.nowMarking.image.path = state.assignmentDetails.snappedAnswerPaths[index]

            commit('disposeCanvas')
            commit('loadCanvas')
            commit('loadImage')
        },

        submit({state, commit}) {

            return new Promise((resolve, reject) => {
                if (state.submission.marks === null || state.submission.marks === undefined) {
                    commit('toggleModalMode')
                    reject()
                } else {
                    MarksRepository.store(
                        {
                            assignmentID: state.assignmentDetails.assignmentID,
                            studentID: state.assignmentDetails.studentID,
                            answerID: state.assignmentDetails.submissionID,
                            submissionType: state.submission.type,
                            snappedAnswers: state.marking,
                            marks: state.submission.marks,
                            feedback: state.submission.feedback
                        })
                        .then(response => {

                            let type = response.data.messageType;

                            if (type === 'success') {
                                resolve(state.assignmentDetails.submissionID);
                            }

                        })
                }
            })


        },

        checkNowMarkingPathExists({state}) {

            return new Promise((resolve, reject) => {
                if (state.nowMarking.image.path) {
                    resolve();
                } else {
                    reject()
                }
            })
        }

    },
    getters: {

        images: (state, getters) => {
            if (getters.hasMarkedSnappedAnswer) {
                return state.assignmentDetails.markedSnappedAnswerPaths
            } else if (getters.hasSnappedAnswer) {
                return state.marking
            }
        },

        markingStickers: (state, getters) => {

            let result = [];
            let size = 3;

            for (let i = 0; i < state.stickerCollection.length; i += 3) {
                let chunk = state.stickerCollection.slice(i, i + size)
                result.push(chunk)
            }

            return result
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
            return state.assignmentDetails.marksID !== null && state.assignmentDetails.marksID !== undefined;
        },

        backgroundImageScaleFactor(state) {
            return state.nowMarking.canvas.dimensions.width / state.nowMarking.image.dimensions.width;
        },

        isMainPage(state) {
            return state.states.isMain === true && state.states.isPreviewing === false && state.states.isMarking === false;
        }

    }
}
