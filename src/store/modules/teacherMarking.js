import SubmissionRepository from "@/repositories/SubmissionRepository";
import {get} from "v-calendar/src/utils/_";
import router from "@/router";
import {fabric} from "fabric";
import stickers from "@/components/Stickers/Stickers";
import MarksRepository from "@/repositories/teachers/MarksRepository";
import 'fabric-history';
import getters from "@/store/getters";

const getDefaultState = () => {
    return {
        states: {
            isLoading: true,
            isMain: true,
            isPreviewing: false,
            isPreparingCanvas: false,
            isMarking: false,
            isSelectingSticker: false,
            isSelectingObject: false,
            isZoomingCanvas: false,
            isPanningCanvas: false,
            isMovingObject: false,
            isModifyingObject: false,
            isDrawing: false,
            isWritingFeedback: false,
            isCheckingSubmission: false,
            isSubmitting: false,
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
            markedSnappedAnswerPaths: null,
            answer_tag: null,
            status: null,
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
            selectedObject: null,
            sticker: null,
            textBox: false,
            canvas: {
                main: {
                    index: null,
                    dimensions: {
                        height: null,
                        width: null
                    }
                },
                markings: {
                    index: null,
                    dimensions: {
                        height: null,
                        width: null
                    }
                }
            },
            trashObject: null,
            overlayScreen: null, // overlay screen object
            isOverlaid: false, // is canvas overlaid
        },

        // Drawing Mode states
        nowDrawing: {
            drawing: true,
            erasing: false
        },

        // Modal being displayed
        nowShowingModal: null,

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
        },
        errorMessages: null
    }
}

export default {
    namespaced: true,
    state: () => getDefaultState(),
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
            state.assignmentDetails.isFirstSubmission = data.is_first;
            state.assignmentDetails.answer_tag = data.answer_tag;
            state.assignmentDetails.status = data.status;

            if (data.snap_answer) {
                state.submission.type = 'snapped';
                state.assignmentDetails.snappedAnswerPaths = state.marking = data.snap_answer_url.split(',');
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
            state.nowMarking.canvas.main.index = new fabric.Canvas('canvas', {
                width: state.nowMarking.canvas.main.dimensions.width,
                height: state.nowMarking.canvas.main.dimensions.height,
            })
        },

        disposeCanvas(state) {
            state.nowMarking.canvas.main.index.dispose();
        },

        togglePreviewMode(state) {

            state.states = {
                isLoading: false,
                isMain: !state.states.isMain,
                isPreviewing: !state.states.isPreviewing,
                isPreparingCanvas: false,
                isMarking: false,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            }
        },

        setMainMode(state) {
            state.states = {
                isLoading: false,
                isMain: true,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: false,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            }
        },

        setWritingFeedbackMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: false,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: true,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            }
        },

        exitWritingFeedbackMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: true,
                isPreparingCanvas: false,
                isMarking: false,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            }
        },

        toggleStickerBar(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: true,
                isSelectingSticker: !state.states.isSelectingSticker,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleEditingTextboxMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: true,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: !state.states.isDrawing,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };

        },
        toggleDrawingMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: true,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: !state.states.isDrawing,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };

        },

        toggleDrawingModeStates(state) {
            // If isDrawing, then initialise drawing mode states
            if (state.states.isDrawing) {
                state.nowDrawing.drawing = !state.nowDrawing.drawing;
                state.nowDrawing.erasing = !state.nowDrawing.erasing;
            } else {
                state.nowDrawing.drawing = true;
                state.nowDrawing.erasing = false;
            }
        },

        toggleModalMode(state, type) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: true,
                isPreparingCanvas: false,
                isMarking: false,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: !state.states.isMovingObject,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: !state.states.isShowingModal,
                isSavingEditedSnappedAnswer: false
            };

            state.nowShowingModal = type;
        },

        setMarkingMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: true,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };

        },
        setPreviewingMode(state) {

            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: true,
                isPreparingCanvas: false,
                isMarking: false,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleSelectingObjectMode(state) {

            let isSelectingObject = state.nowMarking.canvas.main.index.getActiveObject();

            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isMarking: true,
                isSelectingSticker: false,
                isSelectingObject: isSelectingObject,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        togglePreparingCanvasMode(state) {

            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: true,
                isPreparingCanvas: !state.states.isPreparingCanvas,
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isScalingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleMovingObjectMode(state) {

            let isSelectingObject = state.nowMarking.canvas.main.index.getActiveObject();

            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: true,
                isSelectingSticker: false,
                isSelectingObject: state.states.isMovingObject ? isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: !state.states.isMovingObject,
                isModifyingObject: false,
                isWritingFeedback: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleCanvasZoomingMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isMarking: true,
                isSelectingSticker: false,
                isSelectingObject: false,
                isZoomingCanvas: !state.states.isZoomingCanvas,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: false,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleScalingObjectMode(state) {

            let isSelectingObject = state.nowMarking.canvas.main.index.getActiveObject();

            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isPreparingCanvas: false,
                isMarking: true,
                isSelectingSticker: false,
                isSelectingObject: state.states.isModifyingObject ? isSelectingObject: false,
                isZoomingCanvas: false,
                isPanningCanvas: false,
                isDrawing: false,
                isMovingObject: false,
                isModifyingObject: !state.states.isModifyingObject,
                isWritingFeedback: false,
                isCheckingSubmission: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        // Available actions: add, remove
        toggleOverlayScreen(state, action) {

            if (action === 'add' && !state.nowMarking.isOverlaid) {
                if (state.nowMarking.overlayScreen) {
                    state.nowMarking.canvas.main.index.add(state.nowMarking.overlayScreen).renderAll()
                    state.nowMarking.overlayScreen.sendBackwards()
                } else {
                    state.nowMarking.overlayScreen = new fabric.Rect({
                        left: 0,
                        top: 0,
                        fill: 'rgba(0,0,0, 0.5)',
                        width: state.nowMarking.canvas.main.dimensions.width,
                        height: state.nowMarking.canvas.main.dimensions.height,
                        selectable: false
                    })

                    state.nowMarking.canvas.main.index.add(state.nowMarking.overlayScreen).renderAll()
                    state.nowMarking.overlayScreen.sendBackwards()

                }

                state.nowMarking.isOverlaid = true;

            } else if (action === 'remove') {
                if (state.nowMarking.overlayScreen) {
                    state.nowMarking.canvas.main.index.remove(state.nowMarking.overlayScreen)
                    state.nowMarking.isOverlaid = false;

                }
            }

        },

        resetObjectSelection(state) {
            state.nowMarking.canvas.main.index.discardActiveObject().renderAll()
        },

        setInitialCanvasDimensions(state, containerWidth, containerHeight) {

            // Determine canvas dimensions
            let canvasWidth = 0.9 * containerWidth;
            // let canvasWidth = 0.9 * window.innerWidth;
            // if (window.innerWidth > 700) {
            //     if (window.innerWidth > 1000) {
            //         canvasWidth = 0.9 * containerWidth;
                    // canvasWidth = 0.5 * window.innerWidth;
                // } else {
                //     canvasWidth = 0.9 * containerWidth;
                    // canvasWidth = 0.65 * window.innerWidth;
            //     }
            // }

            state.nowMarking.canvas.main.dimensions = {
                height: containerHeight,
                width: canvasWidth
                // height: 0.75 * window.innerHeight,
                // width: 0.9 * window.innerWidth
            }

        },

        resetState(state) {
            Object.assign(state, getDefaultState())
        }


    },
    actions: {

        // FETCH: Submission Details
        fetchData({state, commit}, submissionID) {

            return new Promise((resolve, reject) => {
                SubmissionRepository.find(submissionID)
                    .then(response => {
                        if (response.data.success) {
                            commit('setAssignmentDetails', response.data.data)
                            state.states.isLoading = false;
                            resolve();
                        } else {
                            reject();
                        }
                    });
            });
        },

        /************************
         Convert snapped answers to dataURL asynchronously
         *************************/
        bulkConvertSubmissionsToDataURL({state, getters, commit}) {

            let toConvert = state.marking.length;

            return new Promise((resolve, reject) => {

                state.marking.forEach((imagePath, index) => {

                    // Check if image is already converted to dataURL
                    let isConverted = imagePath.split(",")[0] === 'data:image/jpg;base64' || imagePath.split(",")[0] === 'data:image/jpeg;base64' || imagePath.split(",")[0] === 'data:image/png;base64';

                    // If not yet, convert now
                    if (!isConverted) {

                        SubmissionRepository.convertToDataURL(imagePath)
                            .then(response => {
                                if (response.data.success) {
                                    state.marking[index] = decodeURIComponent(response.data.data);
                                    toConvert--;
                                } else {
                                    console.log('Failed to convert image to dataURL')
                                }
                            })
                            .catch(error => {
                                console.log('Failed to convert image to dataURL')
                            })
                    } else {
                        toConvert--;
                    }

                });


            });
        },

        checkAllConvertedToDataURL({state}) {
            return new Promise((resolve, reject) => {

                let toCheck = state.marking.length;

                state.marking.forEach((imagePath, index) => {
                    let isConverted = imagePath.split(",")[0] === 'data:image/jpg;base64' || imagePath.split(",")[0] === 'data:image/png;base64';

                    if (isConverted) {
                        toCheck--;

                        if (toCheck === 0) {
                            resolve();
                        }

                    } else {
                        reject('Please try again')
                    }
                });
            });
        },


        enterMarkingMode({state, getters, commit}, nowMarking) {

            return new Promise((resolve, reject) => {

                if (state.states.isPreviewing && !getters.isMarkedAssignment) {

                    // Check if image is already converted to dataURL
                    let isConverted = nowMarking.path.split(",")[0] === 'data:image/jpg;base64';

                    if (isConverted) {
                        state.nowMarking.image.index = nowMarking.index;
                        state.nowMarking.image.path = nowMarking.path;
                        resolve()
                    } else {
                        SubmissionRepository.convertToDataURL(nowMarking.path)
                            .then(response => {

                                if (response.data.success) {
                                    state.nowMarking.image.index = nowMarking.index;
                                    state.nowMarking.image.path = decodeURIComponent(response.data.data);

                                    resolve()
                                } else {
                                    reject()
                                }
                            })
                            .catch(error => {
                                reject()
                            })
                    }


                } else {
                    reject()
                }
            })
        },

        /***********
         SEQUENCE:
         1) Get image size
         2) Create new canvas
         3) Set canvas background image
         4) Enable actions
         * */
        initialiseMarkingCanvas({state, commit, dispatch, rootGetters}) {

            dispatch('getSnappedAnswerDimensions').then(() => {

                let scaleFactor = state.nowMarking.canvas.main.dimensions.width / state.nowMarking.image.dimensions.width;

                // Determine if image is longer than screen height
                let imageIsLongerThanScreenHeight = (scaleFactor * state.nowMarking.image.dimensions.height) > 0.7 * window.innerHeight

                // Set canvas size
                state.nowMarking.canvas.main.index = new fabric.Canvas('canvas_snapped_answer', {
                    width: scaleFactor * state.nowMarking.image.dimensions.width,
                    height: imageIsLongerThanScreenHeight ? scaleFactor * state.nowMarking.image.dimensions.height : scaleFactor * state.nowMarking.image.dimensions.height + 0.3 * window.innerHeight,
                })

                // Store canvas dimension values
                state.nowMarking.canvas.main.dimensions = {
                    width: scaleFactor * state.nowMarking.image.dimensions.width,
                    height: imageIsLongerThanScreenHeight ? scaleFactor * state.nowMarking.image.dimensions.height : scaleFactor * state.nowMarking.image.dimensions.height + 0.3 * window.innerHeight,
                    // height: imageIsLongerThanScreenHeight ? scaleFactor * state.nowMarking.image.dimensions.height : 0.7 * window.innerHeight,
                }

                // Set background image of main canvas
                state.nowMarking.canvas.main.index.setBackgroundImage(
                    state.nowMarking.image.path,
                    state.nowMarking.canvas.main.index.renderAll.bind(state.nowMarking.canvas.main.index),
                    {
                        top: imageIsLongerThanScreenHeight ? 0 : state.nowMarking.canvas.main.dimensions.height / 3,
                        left: state.nowMarking.canvas.main.dimensions.width / 2,
                        originX: 'center',
                        originY: imageIsLongerThanScreenHeight ? 'top' : 'center',
                        scaleX: state.nowMarking.canvas.main.dimensions.width / state.nowMarking.image.dimensions.width,
                        scaleY: state.nowMarking.canvas.main.dimensions.width / state.nowMarking.image.dimensions.width
                    },
                    {crossOrigin: 'Anonymous'}
                );


                // Enable/disable marking functions
                dispatch('enableDragAndDropToTrash')

                // Currently enable only for test account
                if (rootGetters['getAuthEmail'] === 'cikgu@snapped.com' || rootGetters['getAuthEmail'] === 'cikgumaria@snapped.com') {
                    dispatch('enableCanvasZoom')
                    dispatch('enableCanvasPanning')
                }

                dispatch('handleObjectModification')


            })
        },

        getSnappedAnswerDimensions({state, commit, dispatch}) {
            return new Promise((resolve, reject) => {
                fabric.Image.fromURL(state.nowMarking.image.path, (img, error) => {
                    state.nowMarking.image.dimensions.width = img.width;
                    state.nowMarking.image.dimensions.height = img.height;
                    resolve();
                });
            })
        },

        /*****************
         * CANVAS: ZOOM
         ****************/
        enableCanvasZoom({state, commit, dispatch}) {

            let canvas = state.nowMarking.canvas.main.index;

            // Track canvas events
            canvas.on({

                // ON MOUSE WHEEL
                'mouse:wheel': function (opt) {

                    commit('toggleCanvasZoomingMode')

                    if (state.states.isZoomingCanvas) {
                        let delta = opt.e.deltaY;
                        let zoom = canvas.getZoom();
                        zoom *= 0.999 ** delta;
                        if (zoom > 6) zoom = 6;
                        if (zoom < 1) zoom = 1;
                        canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);

                        opt.e.preventDefault();
                        opt.e.stopPropagation();

                        let vpt = this.viewportTransform;

                        if (zoom < 400 / 1000) {
                            vpt[4] = 200 - 1000 * zoom / 2;
                            vpt[5] = 200 - 1000 * zoom / 2;
                        } else {
                            if (vpt[4] >= 0) {
                                vpt[4] = 0;
                            } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
                                vpt[4] = canvas.getWidth() - 1000 * zoom;
                            }
                            if (vpt[5] >= 0) {
                                vpt[5] = 0;
                            } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
                                vpt[5] = canvas.getHeight() - 1000 * zoom;
                            }
                        }

                        commit('toggleCanvasZoomingMode')
                    }


                },
                'touch:gesture': function (opt) {

                    // If user pinch to zoom
                    if (opt.e.touches && opt.e.touches.length === 2 && !state.states.isModifyingObject) {

                        if (state.states.isSelectingObject) {
                            commit('resetObjectSelection')
                        }

                        commit('toggleCanvasZoomingMode')

                        // dispatch('addDebugMessage', stateChange)

                        if (state.states.isZoomingCanvas) {

                            // dispatch('addDebugMessage', [
                            //     `touch gesture : ${opt.e.touches.length}`,
                            //     `is zooming: ${state.states.isZoomingCanvas}`,
                            //     `is selecting: ${state.states.isSelectingObject}`
                            // ])

                            // dispatch('addDebugMessage', `zooming`)


                            // Get initial canvas zoom value and initial gesture scale value
                            let zoom = canvas.getZoom();
                            let delta = opt.self.scale;

                            if (opt.self.state === "start") {
                                zoom = delta > 1 ? zoom + 1 : zoom;
                            }

                            // Slow zoom in, quicker zoom out
                            if (delta > 1) {
                                zoom = zoom * (1.01 ** delta);
                            } else {
                                zoom = zoom ** (delta);
                            }

                            // Set max zoom in and max zoom out
                            if (zoom > 4) zoom = 4;
                            if (zoom < 1) zoom = 1;


                            // Determine point of scaling
                            let point = new fabric.Point(opt.self.x, opt.self.y);
                            if (zoom < 1) point = new fabric.Point(canvas.width / 2, canvas.height / 2);

                            // // Zoom to pinch point
                            canvas.zoomToPoint(point, zoom);

                            commit('toggleCanvasZoomingMode')

                        }


                    }
                }

            });
        },

        /********************************
         * CANVAS: DRAG & DROP TO TRASH
         *******************************/
        enableDragAndDropToTrash({state, commit, dispatch}) {

            let canvas = state.nowMarking.canvas.main.index;

            canvas.on({


                }
            )
        },

        /********************************
         * CANVAS: PANNING
         *******************************/
        enableCanvasPanning({state, commit, dispatch}) {

            let canvas = state.nowMarking.canvas.main.index;

            // ON DESKTOP
            canvas.on({
                'mouse:down': function (opt) {
                    let event = opt.e;


                    if (event.altKey === true) {

                        this.isDragging = true;
                        this.selection = false;
                        this.lastPosX = event.touches[0].clientX;
                        this.lastPosY = event.touches[0].clientY;
                    }
                },

                'mouse:move': function (opt) {
                    if (this.isDragging) {
                        let event = opt.e;
                        let vpt = this.viewportTransform;
                        vpt[4] += event.touches[0].clientX - this.lastPosX;
                        vpt[5] += event.touches[0].clientY - this.lastPosY;
                        this.requestRenderAll();
                        this.lastPosX = event.touches[0].clientX;
                        this.lastPosY = event.touches[0].clientY;
                    }
                },
                'mouse:up': function (opt) {
                    // on mouse up we want to recalculate new interaction
                    // for all objects, so we call setViewportTransform
                    this.setViewportTransform(this.viewportTransform);
                    this.isDragging = false;
                    this.selection = true;
                }
            });

            // ON MOBILE
            canvas.on({

                'touch:drag': function (opt) {

                    // Ensure single finger touch and not performing other actions
                    if (opt.e.touches && opt.e.touches.length === 1 && !state.states.isMovingObject && !state.states.isModifyingObject && !state.states.isDrawing) {

                        this.selection = false;

                        let initialX = JSON.parse(JSON.stringify(opt.self.start.x));
                        let initialY = JSON.parse(JSON.stringify(opt.self.start.y));

                        // Get last point
                        let lastX = opt.self.x;
                        let lastY = opt.self.y;

                        let deltaX = lastX - initialX;
                        let deltaY = lastY - initialY;

                        let delta = new fabric.Point(deltaX / 20, deltaY / 20);
                        canvas.relativePan(delta);

                        state.dragCount++;
                    }

                },

            })
        },

        handleObjectModification({state, commit, dispatch}) {
            let canvas = state.nowMarking.canvas.main.index;

            canvas.on({
                'object:scaling': function (event) {

                    // If state isMovingObject not already set, set to true
                    if (event.e.touches.length === 1 && !state.states.isModifyingObject && !state.states.isZoomingCanvas) {
                        commit('toggleScalingObjectMode')
                        state.nowMarking.selectedObject = event.target;
                        commit('toggleOverlayScreen', 'add')
                    }

                    if (event.e.touches.length === 2) {
                        commit('resetObjectSelection')
                    }
                },
                'object:scaled': function (event) {
                    commit('toggleScalingObjectMode')
                    commit('toggleOverlayScreen', 'remove')
                },
                'object:rotating': function (event) {
                    // If state isMovingObject not already set, set to true
                    if (event.e.touches.length === 1 && !state.states.isModifyingObject && !state.states.isZoomingCanvas) {
                        commit('toggleScalingObjectMode')
                        state.nowMarking.selectedObject = event.target;
                        commit('toggleOverlayScreen', 'add')
                    }
                },
                'object:rotated': function (event) {
                    commit('toggleScalingObjectMode')
                    commit('toggleOverlayScreen', 'remove')
                },
                'object:moving': function (event) {

                    // If state isMovingObject not already set, set to true
                    if (!state.states.isMovingObject && event.e.touches.length === 1) {
                        commit('toggleMovingObjectMode')
                        state.nowMarking.selectedObject = event.target;

                        commit('toggleOverlayScreen', 'add')

                    }
                },
                'object:moved': function (event) {
                    commit('toggleMovingObjectMode')
                    commit('toggleOverlayScreen', 'remove')
                },

                'selection:created': function () {
                    commit('toggleSelectingObjectMode')
                },
                'selection:updated': function () {

                },
                'selection:cleared': function () {
                    commit('toggleSelectingObjectMode')
                },

            });
        },

        loadSticker({state, commit}, stickerName) {

            fabric.loadSVGFromString(stickers[stickerName], (objects, options) => {

                let obj = fabric.util.groupSVGElements(objects, options);
                obj.scaleToHeight(state.nowMarking.canvas.main.dimensions.height / 12)
                    .set({
                        left: state.nowMarking.canvas.main.dimensions.width / 2,
                        top: state.nowMarking.canvas.main.dimensions.height / 2
                    })
                    .setCoords();

                state.nowMarking.canvas.main.index.add(obj).renderAll();
            });

            commit('toggleStickerBar')
        },

        loadTextBox({state, commit}) {


            // let oldTop = state.nowMarking.canvas.main.dimensions.height / 2;
            // let oldLeft = window.innerWidth / 2;

            let oldTop = state.nowMarking.canvas.main.dimensions.width / 2;
            let oldLeft = state.nowMarking.canvas.main.dimensions.width / 2;
            // let oldTop = window.innerWidth / 2;
            // let oldLeft = window.innerWidth / 2;


            let textBox = new fabric.Textbox('', {
                originX: "center",
                originY: "bottom",
                textAlign: "center",
                fontFamily: "Segoe UI",
                top: oldTop,
                left: state.nowMarking.canvas.main.dimensions.width / 2,
                // left: window.innerWidth / 2,
                fontSize: 24,
                fill: "#F53B57",
                lockUniScaling: true
            })

            state.nowMarking.canvas.main.index.add(textBox).setActiveObject(textBox);

            // Enter editing mode immediately
            textBox.enterEditing()

            commit('toggleOverlayScreen', 'add')

            // Listen to textbox events
            textBox.on("editing:entered", function () {

                commit('toggleOverlayScreen', 'add')

                oldTop = this.top;
                oldLeft = this.left;


                this.top = state.nowMarking.canvas.main.dimensions.height / 2;
                this.left = state.nowMarking.canvas.main.dimensions.width / 2;
                // this.left = window.innerWidth / 2;

            }).on("editing:exited", function () {
                this.top = oldTop;
                this.left = oldLeft;

                commit('toggleOverlayScreen', 'remove')

            });
        },

        beginDrawingMode({state, commit}) {

            commit('toggleDrawingModeStates')
            commit('toggleDrawingMode')

            // Set canvas drawing mode true
            state.nowMarking.canvas.main.index.isDrawingMode = true;

            state.nowMarking.canvas.main.index
                .on('mouse:down:before', function (e) {
                    if (state.nowDrawing.drawing) {
                        state.nowMarking.canvas.main.index.freeDrawingBrush.color = 'rgba(245, 59, 87, 1)';
                        state.nowMarking.canvas.main.index.freeDrawingBrush.width = 2;
                    }
                })
        },

        exitDrawingMode({state, commit}) {
            commit('toggleDrawingMode')
            commit('toggleDrawingModeStates')
            state.nowMarking.canvas.main.index.isDrawingMode = false;

        },

        removeSelectedObject({state}) {
            state.nowMarking.canvas.main.index.remove(state.nowMarking.canvas.main.index.getActiveObject());
        },

        doneEditSnappedAnswer({state, commit}) {

            // Load marking canvas on snapped answer canvas
            let markings = state.nowMarking.canvas.main.index.toJSON()

            return new Promise((resolve, reject) => {
                state.marking[state.nowMarking.image.index] = state.nowMarking.canvas.main.index.toDataURL()
                commit('setPreviewingMode')
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

        undoEditedSnappedAnswer({state, commit, dispatch}) {
            let index = state.nowMarking.image.index;
            state.nowMarking.image.path = state.assignmentDetails.snappedAnswerPaths[index]
            commit('disposeCanvas')
            dispatch('initialiseMarkingCanvas')
        },



        submit({state, commit, dispatch}) {

            return new Promise((resolve, reject) => {

                if (state.submission.marks === null || state.submission.marks === undefined) {
                    commit('toggleModalMode', 'error_missing_mark')
                    reject()
                } else {

                    if (!state.states.isSubmitting) {

                        commit('toggleModalMode', 'is_checking')

                        dispatch('checkAllConvertedToDataURL')

                            // If all image types are dataURL
                            .then(response => {
                                commit('toggleModalMode')
                                commit('toggleModalMode', 'is_submitting')

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
                                        if (response.data.success) {
                                            commit('setMainMode')
                                            resolve(state.assignmentDetails.submissionID);
                                        } else {
                                            commit('toggleModalMode')
                                            commit('toggleModalMode', 'error_submit_markings')
                                            state.states.errorMessages = response.data.data.error;
                                        }
                                    })
                                    .catch(error => {
                                        commit('toggleModalMode')
                                        commit('toggleModalMode', 'error_submit_markings')
                                        state.states.errorMessages = error;
                                    })


                            })

                            // If some images are not converted to dataURL yet
                            .catch(error => {

                                setTimeout(() => {
                                    commit('toggleModalMode')
                                    commit('toggleModalMode', 'error_invalid_image_type')
                                }, 1500)
                            })


                    } else {
                        console.log('Already submitting a marking.')
                    }

                }
            })


        },
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

            let result = [
                [
                    'tick-sticker',
                    'false-sticker',
                    'question-mark-sticker'
                ],
                [
                    'confused-person-sticker',
                    'lets-go-sticker',
                    'top-sticker'
                ]
            ];

            return result
        },

        isAnswered: (state) => {
            return state.assignmentDetails.answer_tag !== 'unanswered';
        },

        answerTags: (state) => {

            let tag = state.assignmentDetails.answer_tag;

            if (tag === 'unanswered') {
                return tag;
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
            return state.assignmentDetails.marksID !== null && state.assignmentDetails.marksID !== undefined;
        },

        markingPathExists(state) {
            return state.nowMarking.image.path !== null;
        },

        backgroundImageScaleFactor(state) {
            return state.nowMarking.canvas.main.dimensions.width / state.nowMarking.image.dimensions.width;
        },

        isMainPage(state) {
            return state.states.isMain === true && state.states.isPreviewing === false && state.states.isMarking === false;
        },

        isPreviewing(state) {
            return state.states.isMain === false && state.states.isPreviewing === true && state.states.isMarking === false;
        },

        isPreparingCanvas(state) {
            return state.states.isPreviewing === true && state.states.isPreparingCanvas === true;
        },

    }
}
