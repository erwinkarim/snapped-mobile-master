import SubmissionRepository from "@/repositories/SubmissionRepository";
import {get} from "v-calendar/src/utils/_";
import router from "@/router";
import {fabric} from "fabric";
import stickers from "@/components/Stickers/Stickers";
import MarksRepository from "@/repositories/teachers/MarksRepository";
import 'fabric-history';

export default {
    namespaced: true,
    state: () => ({

        states: {
            isLoading: true,
            isMain: true,
            isPreviewing: false,
            isMarking: false,
            isSelectingSticker: false,
            isMovingObject: false,
            isDrawing: false,
            isWritingFeedback: false,
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
            overlayScreen: null
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

        test: [],
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
            state.assignmentDetails.isFirstSubmission = data.is_first;

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
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: false,
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
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: false,
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
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: true,
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
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: false,
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
                isMarking: true,
                isSelectingSticker: !state.states.isSelectingSticker,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: false,
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
                isMarking: true,
                isSelectingSticker: false,
                isDrawing: !state.states.isDrawing,
                isMovingObject: false,
                isWritingFeedback: false,
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
                isMarking: true,
                isSelectingSticker: false,
                isDrawing: !state.states.isDrawing,
                isMovingObject: false,
                isWritingFeedback: false,
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
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: !state.states.isMovingObject,
                isWritingFeedback: false,
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
                isMarking: true,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: false,
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
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleMovingObjectMode(state) {
            state.states = {
                isLoading: false,
                isMain: false,
                isPreviewing: false,
                isMarking: true,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: !state.states.isMovingObject,
                isWritingFeedback: false,
                isSubmitting: false,
                isShowingModal: false,
                isSavingEditedSnappedAnswer: false
            };
        },

        toggleTrashIcon(state) {

            if (state.states.isMovingObject) {
                let trash = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> <path fill="#FFFFFF"  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>';

                if (!state.nowMarking.trashObject) {
                    fabric.loadSVGFromString(trash, (objects, options) => {

                        let obj = fabric.util.groupSVGElements(objects, options);

                        obj.scaleToHeight(state.nowMarking.canvas.main.dimensions.height / 24)
                            .set({
                                left: state.nowMarking.canvas.main.dimensions.width / 2,
                                top: state.nowMarking.canvas.main.dimensions.height * 0.9,
                                width: state.nowMarking.canvas.main.dimensions.width / 12,
                                height: state.nowMarking.canvas.main.dimensions.width / 12,
                                selectable: false
                            })
                            .setCoords();


                        state.nowMarking.trashObject = obj;
                        state.nowMarking.canvas.main.index.add(obj).renderAll();
                    });
                } else {
                    state.nowMarking.canvas.main.index.add(state.nowMarking.trashObject).renderAll()

                }

            } else {
                state.nowMarking.canvas.main.index.remove(state.nowMarking.trashObject).renderAll()
            }

        },

        // Available actions: add, remove
        toggleOverlayScreen(state, action) {
            if (action === 'add') {
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
            } else if (action === 'remove') {
                if (state.nowMarking.overlayScreen) {
                    state.nowMarking.canvas.main.index.remove(state.nowMarking.overlayScreen)
                }
            }

        },


        setOriginalState(state) {

            state.states = {
                isLoading: true,
                isMain: true,
                isPreviewing: false,
                isMarking: false,
                isSelectingSticker: false,
                isDrawing: false,
                isMovingObject: false,
                isWritingFeedback: false,
                isSubmitting: false,
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
                    main: {
                        index: null,
                        dimensions: {
                            height: 0.75 * window.innerHeight,
                            width: 0.9 * window.innerWidth
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

                    if (response.data.success) {
                        commit('setAssignmentDetails', response.data.data)
                        state.states.isLoading = false;
                    }
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

        initialiseMarkingCanvas({state, commit, dispatch}) {
            dispatch('loadImage').then(() => {

            })
        },

        loadImage({state, commit, dispatch}) {


            // First, get image's dimension. Then, resize canvas while setting background image
            fabric.Image.fromURL(state.nowMarking.image.path, (img, error) => {


                state.nowMarking.image.dimensions.width = img.width;
                state.nowMarking.image.dimensions.height = img.height;

                let scaleFactor = state.nowMarking.canvas.main.dimensions.width / state.nowMarking.image.dimensions.width;

                // Determine if image is longer than screen height
                let imageIsLongerThanScreenHeight = (scaleFactor * state.nowMarking.image.dimensions.height) > 0.7 * window.innerHeight

                // Set canvas size
                state.nowMarking.canvas.main.index = new fabric.Canvas('canvas_snapped_answer', {
                    width: scaleFactor * state.nowMarking.image.dimensions.width,
                    height: imageIsLongerThanScreenHeight ? scaleFactor * state.nowMarking.image.dimensions.height : scaleFactor * state.nowMarking.image.dimensions.height + 0.3 * window.innerHeight,
                    // height: imageIsLongerThanScreenHeight ? scaleFactor * state.nowMarking.image.dimensions.height : 0.7 * window.innerHeight,
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

                let canvas = state.nowMarking.canvas.main.index;

                // Track canvas events
                canvas.on({
                    'mouse:wheel': function (opt) {
                        console.log(`TOUCH: ${fabric.isTouchSupported}`)

                        /*****************
                         *  HANDLE ZOOM
                         ****************/
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
                    }, 'touch:gesture': function (opt) {
                        console.log(`TOUCH: ${fabric.isTouchSupported}`)

                        let canvas = state.nowMarking.canvas.main.index;
                        // let textBox = new fabric.Textbox(`${opt.e.touches} | ${opt.e.touches.length}`, {
                        //     originX: "center",
                        //     originY: "bottom",
                        //     textAlign: "center",
                        //     fontFamily: "Segoe UI",
                        //     top:  window.innerHeight /2,
                        //     left: window.innerWidth /2,
                        //     fontSize: 24,
                        //     fill: "#F53B57",
                        //     lockUniScaling: true
                        // })
                        //
                        // canvas.add(textBox).renderAll()
                        //
                        // setTimeout(function(){
                        //     state.nowMarking.canvas.main.index.remove(textBox);
                        // }, 1000);

                        // state.test = {
                        //     state: opt.self.state,
                        //     X: opt.self.x,
                        //     Y: opt.self.y,
                        //     touches: opt.e.touches,
                        //     length: opt.e.touches.length,
                        //     scale: opt.self.scale,
                        //     zoom: canvas.getZoom()
                        // }

                        if (state.test.length > 0) {
                            state.test = [
                                "State: ''",
                                "X: ''",
                                "Y: ''",
                                "touches: ''",
                                "length: ''",
                                "scale: ''",
                                "Zoom: ''",
                            ]
                        }

                        state.test = [
                            `State: ${opt.self.state}`,
                            `X: ${opt.self.x}`,
                            `Y: ${opt.self.y}`,
                            `touches: ${opt.e.touches}`,
                            `length: ${opt.e.touches.length}`,
                            `scale: ${opt.self.scale}`,
                            `Zoom: ${canvas.getZoom()}`,
                        ]

                        // setTimeout(function(){
                        //     state.test = ''
                        // }, 3000);


                        if (opt.e.touches && opt.e.touches.length === 2) {
                            // Get event point
                            // let point = new fabric.Point(opt.self.x, opt.self.y);
                            // // Remember canvas scale at gesture start
                            // if (opt.self.state === "start") {
                            //     let zoomStartScale = self.canvas.getZoom();
                            // }
                            // // Calculate delta from start scale
                            // let delta = zoomStartScale * opt.self.scale;
                            // // Zoom to pinch point
                            // self.canvas.zoomToPoint(point, delta);

                            state.test.push(`State: ${opt.self.state}`)
                            state.test.push(`X: ${opt.self.x}`)
                            state.test.push(`Y: ${opt.self.y}`)
                            state.test.push(`Zoom: ${canvas.getZoom()}`)

                            // state.test = {
                            //     state: opt.self.state,
                            //     X: opt.self.x,
                            //     Y: opt.self.y,
                            //     zoom: canvas.getZoom()
                            // }

                            // /*****************
                            //  *  HANDLE ZOOM
                            //  ****************/
                            // let delta = opt.e.deltaY;
                            // let zoom = canvas.getZoom();
                            // zoom *= 0.999 ** delta;
                            // if (zoom > 6) zoom = 6;
                            // if (zoom < 1) zoom = 1;
                            // canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
                            //
                            // opt.e.preventDefault();
                            // opt.e.stopPropagation();
                            //
                            //
                            // let vpt = this.viewportTransform;
                            //
                            // if (zoom < 400 / 1000) {
                            //     vpt[4] = 200 - 1000 * zoom / 2;
                            //     vpt[5] = 200 - 1000 * zoom / 2;
                            // } else {
                            //     if (vpt[4] >= 0) {
                            //         vpt[4] = 0;
                            //     } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
                            //         vpt[4] = canvas.getWidth() - 1000 * zoom;
                            //     }
                            //     if (vpt[5] >= 0) {
                            //         vpt[5] = 0;
                            //     } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
                            //         vpt[5] = canvas.getHeight() - 1000 * zoom;
                            //     }
                            // }


                        }
                    }

                })

                    //     .on('mouse:wheel', function (opt) {
                    //
                    //         console.log(`TOUCH: ${fabric.isTouchSupported}`)
                    //
                    //         /*****************
                    //          *  HANDLE ZOOM
                    //          ****************/
                    //         let delta = opt.e.deltaY;
                    //         let zoom = canvas.getZoom();
                    //         zoom *= 0.999 ** delta;
                    //         if (zoom > 6) zoom = 6;
                    //         if (zoom < 1) zoom = 1;
                    //         canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
                    //
                    //         opt.e.preventDefault();
                    //         opt.e.stopPropagation();
                    //
                    //
                    //         let vpt = this.viewportTransform;
                    //
                    //         if (zoom < 400 / 1000) {
                    //             vpt[4] = 200 - 1000 * zoom / 2;
                    //             vpt[5] = 200 - 1000 * zoom / 2;
                    //         } else {
                    //             if (vpt[4] >= 0) {
                    //                 vpt[4] = 0;
                    //             } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
                    //                 vpt[4] = canvas.getWidth() - 1000 * zoom;
                    //             }
                    //             if (vpt[5] >= 0) {
                    //                 vpt[5] = 0;
                    //             } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
                    //                 vpt[5] = canvas.getHeight() - 1000 * zoom;
                    //             }
                    //         }
                    // })
                    .on('object:moving', function (event) {

                        // If state isMovingObject not already set, set to true
                        if (!state.states.isMovingObject) {
                            commit('toggleMovingObjectMode')
                            state.nowMarking.selectedObject = event.target;
                            commit('toggleTrashIcon')

                            commit('toggleOverlayScreen', 'add')
                        }
                    })
                    .on('object:moved', function (event) {
                        commit('toggleMovingObjectMode')
                        commit('toggleTrashIcon')
                        commit('toggleOverlayScreen', 'remove')

                        // Set trash area
                        let trashHorizontalCenter = state.nowMarking.canvas.main.index.width / 2;
                        let trashVerticalCenter = state.nowMarking.canvas.main.dimensions.height * 0.9;
                        let margin = state.nowMarking.canvas.main.index.width / 12;
                        let trashMaxLeft = trashHorizontalCenter - margin;
                        let trashMaxRight = trashHorizontalCenter + (margin * 2)
                        let trashMaxTop = trashVerticalCenter - (margin)
                        let trashMaxBottom = trashVerticalCenter + (margin * 2)

                        // Get object dimensions
                        let objectLeft = state.nowMarking.selectedObject.left;
                        let objectTop = state.nowMarking.selectedObject.top;
                        let objectWidth = state.nowMarking.selectedObject.width;
                        let objectHeight = state.nowMarking.selectedObject.height;
                        let objectHorizontalCenter = objectLeft + (objectWidth / 2);
                        let objectVerticalCenter = objectTop + (objectHeight / 2);

                        if (state.nowMarking.selectedObject.get('type') === 'textbox') {
                            objectVerticalCenter = objectTop;
                            objectHorizontalCenter = objectLeft;
                        }

                        if (
                            ((objectHorizontalCenter > trashMaxLeft) && (objectHorizontalCenter < trashMaxRight))
                            && ((objectVerticalCenter > trashMaxTop) && (objectVerticalCenter < trashMaxBottom))
                        ) {
                            state.nowMarking.canvas.main.index.remove(state.nowMarking.selectedObject);
                        }
                    })

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

            let oldTop = window.innerWidth / 2;
            let oldLeft = window.innerWidth / 2;


            let textBox = new fabric.Textbox('', {
                originX: "center",
                originY: "bottom",
                textAlign: "center",
                fontFamily: "Segoe UI",
                top: oldTop,
                left: window.innerWidth / 2,
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
                this.left = window.innerWidth / 2;

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

                    // console.log(`Drawing: ${state.nowDrawing.drawing} | Erasing: ${state.nowDrawing.erasing}`)
                    // if (state.nowDrawing.erasing) {
                    //     state.nowMarking.canvas.main.index.freeDrawingBrush.color = 'rgba(220, 222, 224, 0.16)';
                    //     state.nowMarking.canvas.main.index.freeDrawingBrush.width = 5;
                    // }
                })
            // .on('path:created', function (opt) {
            //
            //     console.log('path created')
            //     if (state.nowDrawing.drawing) {
            //         opt.path.globalCompositeOperation = 'source-over';
            //         opt.path.lineWidth = 2;
            //         opt.path.stroke = 'rgba(245, 59, 87, 1)';
            //         state.nowMarking.canvas.markings.index.requestRenderAll();
            //     }
            //
            //     // Make all drawings unselectable
            //     // opt.path.selectable = false;
            // })
        },

        exitDrawingMode({state, commit}) {
            commit('toggleDrawingMode')
            commit('toggleDrawingModeStates')
            state.nowMarking.canvas.main.index.isDrawingMode = false;

        },

        doneEditSnappedAnswer({state, commit}) {

            // Load marking canvas on snapped answer canvas
            let markings = state.nowMarking.canvas.main.index.toJSON()

            return new Promise((resolve, reject) => {
                state.marking[state.nowMarking.image.index] = state.nowMarking.canvas.main.index.toDataURL()
                // state.marking[state.nowMarking.image.index] = state.nowMarking.canvas.main.index.toDataURL()
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
            dispatch('loadImage')
        },

        submit({state, commit}) {

            return new Promise((resolve, reject) => {
                if (state.submission.marks === null || state.submission.marks === undefined) {
                    commit('toggleModalMode', 'no_mark')
                    reject()
                } else {

                    if (!state.states.isSubmitting) {

                        commit('toggleModalMode', 'is_submitting')

                        state.states.isSubmitting = true;

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
                                }
                            })
                    } else {
                        console.log('Already submitting a marking.')
                    }

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
            return state.nowMarking.canvas.main.dimensions.width / state.nowMarking.image.dimensions.width;
        },

        isMainPage(state) {
            return state.states.isMain === true && state.states.isPreviewing === false && state.states.isMarking === false;
        }

    }
}
