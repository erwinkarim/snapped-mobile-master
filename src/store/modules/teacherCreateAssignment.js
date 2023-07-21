import TeacherRepository from "@/repositories/TeacherRepository";
import moment from "moment";
import Repository from "@/repositories/Repository";
import getters from "@/store/getters";
import {get} from "v-calendar/src/utils/_";

// shoud move to repository later.
import axios from "axios";

let id = process.env.VUE_APP_MYSOALAN_KEY;
let secret = process.env.VUE_APP_MYSOALAN_SECRET;

// create token
const token = Buffer.from(`${id}:${secret}`, 'utf8').toString('base64');
let auth_url = 'https://api.mysoalan.com/v1/intg/oauth';

/*
	state to handle assignment creations
	1. question creation
	the gist is ;-
	creation question => creatingQuestionDetails

	when press 'save' (in CreateQuestionForm.vue)
	* save<XXX>ToDraf
		* creatingQuestionDetails => questionDraft

	when press 'save' again (in TeacherAssignments/Create/Index.vue)
	* calls saveQuestion
		* questionDraft => assignmentDetails.question
		* questionDraft is cleared
		* change the state from isCreatingQuestion to isWritingQuestion

	when press publish
	* sendData is called to push the question to the server/db
*/
export default {
	namespaced: true,
	state: () => ({
		// STATES
		states: {
			isMain: true,
			isCreatingQuestion: false,
			isCreatingZoomQuestion: false,
			isCreatingMySoalanQuestion: false,
			isSelectingDuration: false,
			isSelectingQuestionType: false,
			isWritingQuestion: false,
			isSnappingQuestion: false,
			isZoomQuestion: false,
			isMySoalanQuestion: false,
			isCroppingSnappedQuestion: false,
			isResettingQuestion: false,
			isShowingScheduler: false,
			isPublishing: false,
			isPublished: false,
			isShowingError: false,
			isInZoomMeeting: false,
			isVideoOn: false,
			isMicOn: false,
			isRecording: false,
			isScreenShare: false,
			meeting_id: null,
			isZoomPreview: false,
			mySoalanInfo: null,
		},

		// Main details to be submitted
		assignmentDetails: {
			title: null,
			school_id: "",
			subject_id: "",
			classroom_id: null,
			due_datetime: null,
			auto_marking: false,
			question: {
				type: null,
				title: null,
				writtenQuestion: null,
				snappedQuestions: [],
				snappedPreviews: [],
				zoomMeetings: null,
				mySoalan: null,
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
			zoomMeetings: null,
			mySoalan: null, 
		},

		// Currently creating question details. To be used instantaneous.
		// When saved, load into question draft
		creatingQuestionDetails: {
			type: null,
			title: null,
			writtenQuestion: null,
			snappedQuestions: [],
			snappedPreviews: [],
			zoomMeetings: null,
			mySoalan: null, 
		},

		selectables: {
			schools: [],
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
					state.states.isCreatingZoomQuestion = false;
					state.states.isCreatingMySoalanQuestion = false;
					state.states.isSelectingQuestionType = false;
					state.states.isWritingQuestion = false;
					state.states.isSnappingQuestion = false;
					state.states.isZoomQuestion = false;
			},

			beginEditingQuestionMode(state, savedQuestionType) {
					state.states.isMain = false;
					state.states.isCreatingQuestion = true;
					state.states.isSelectingQuestionType = false;
					state.states.isEditingQuestion = true;

					state.states.isSnappingQuestion = savedQuestionType === 'snapped';
					state.states.isZoomQuestion = savedQuestionType === 'zoom';
			},

			beginEditingWrittenQuestionMode(state){
					state.states.isSelectingQuestionType = false;
					state.states.isWritingQuestion = true;
			},

			toggleSelectingDurationMode(state) {
					state.states.isSelectingDuration = !state.states.isSelectingDuration
			},

			toggleWritingQuestionMode(state) {
					/*
						flip the writing question mode. init states, both are false
					*/
					state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
					state.states.isWritingQuestion = !state.states.isWritingQuestion;
			},

			toogleZoomQuestionMode(state) {
				state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
				state.states.isCreatingZoomQuestion = !state.states.isCreatingZoomQuestion;
			},

			toggleSnappingQuestionMode(state) {
					state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
					state.states.isSnappingQuestion = !state.states.isSnappingQuestion;
			},

			toggleMySoalanQuestionMode(state) {
					state.states.isSelectingQuestionType = !state.states.isSelectingQuestionType;
					state.states.isMySoalanQuestion = !state.states.isMySoalanQuestion;
					state.states.isCreatingMySoalanQuestion = !state.states.isCreatingMySoalanQuestion;
			},

			toggleShowingErrorMode(state) {
					// console.log('call toggleShowingErrorMode');
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

			toggleIsInZoomMeeting(state) {
				state.states.isInZoomMeeting = !state.states.isInZoomMeeting;

			},
			cancelZoomEditMode(state){
				state.states.isCreatingZoomQuestion = false;
			},
			cancelZoomMeeting(state){
				state.states.isInZoomMeeting = false;

			},
			deleteZoomVideo(state){
				state.states.isCreatingZoomQuestion = false;
				state.questionDraft.zoomMeetings = null;
			},
			toggleSnappedQuestionPreviewStatus(state, key) {
					state.creatingQuestionDetails.snappedPreviews[key].preview = !state.creatingQuestionDetails.snappedPreviews[key].preview;
					state.creatingQuestionDetails.snappedPreviews[key].cropping = false;
			},
			toggleCroppingSnappedQuestionMode(state, key) {
					state.creatingQuestionDetails.snappedPreviews[key].preview = !state.creatingQuestionDetails.snappedPreviews[key].preview;
					state.creatingQuestionDetails.snappedPreviews[key].cropping = !state.creatingQuestionDetails.snappedPreviews[key].cropping;
			},

			toggleVideo(state) {
				state.states.isVideoOn = !state.states.isVideoOn;
				console.log('inside toggleVideo fn', state.states.isVideoOn);
			},

			toggleMic(state) {
				state.states.isMicOn = !state.states.isMicOn;
				console.log('toogle mic button');
			},

			toggleShareScreen(state) {
				state.states.isScreenShare = !state.states.isScreenShare;
				console.log('inside toggleShareScreen fn', state.states.isScreenShare);
			},

			toggleRecording(state) {
					state.states.isRecording = !state.states.isRecording;
			},

			// push creatingQuestionsDetails -> questionDraft
			saveQuestionToDraft(state) {
				// console.log('creatingQuestionDetails.writtenQuestion', state.creatingQuestionDetails.writtenQuestion);
				Object.assign(state.questionDraft, state.creatingQuestionDetails);
				/*
					state.questionDraft = {
							type: JSON.parse(JSON.stringify(state.creatingQuestionDetails.type)),
							title: JSON.parse(JSON.stringify(state.creatingQuestionDetails.title)),
							writtenQuestion: JSON.parse(JSON.stringify(state.creatingQuestionDetails.writtenQuestion)),
							snappedQuestions: JSON.parse(JSON.stringify(state.creatingQuestionDetails.snappedQuestions)),
							snappedPreviews: JSON.parse(JSON.stringify(state.creatingQuestionDetails.snappedPreviews)),
							zoomMeetings: state.creatingQuestionDetails.zoomMeetings,
							mySoalan: state.creatingQuestionDetails.mySoalan,
					}
				*/
			},

			// push questionDraft -> assignmentDetails.question
			saveQuestionToAssignmentDetails(state) {
				// console.log('questionDraft.mySoalan', state.questionDraft.mySoalan);
				// console.log('assignmentDetails.question.mySoalan', state.assignmentDetails.question.mySoalan);

				Object.assign(state.assignmentDetails.question, state.questionDraft);
				
				/*
					state.assignmentDetails.question = {
							type: JSON.parse(JSON.stringify(state.questionDraft.type)),
							title: JSON.parse(JSON.stringify(state.questionDraft.title)),
							writtenQuestion: JSON.parse(JSON.stringify(state.questionDraft.writtenQuestion)),
							snappedQuestions: JSON.parse(JSON.stringify(state.questionDraft.snappedQuestions)),
							snappedPreviews: JSON.parse(JSON.stringify(state.questionDraft.snappedPreviews)),
							zoomMeetings: state.questionDraft.zoomMeetings,
							mySoalan: state.questionDraft.mySoalan,
					}
				*/
			},

			// set questionDraft and creatingQuestionDetails to null
			resetCreatingQuestion(state) {

					state.questionDraft = {
							type: null,
							title: null,
							writtenQuestion: null,
							snappedQuestions: [],
							snappedPreviews: [],
							zoomMeetings: null,
							mySoalan: null,
					}

					state.creatingQuestionDetails = {
							type: null,
							title: null,
							writtenQuestion: null,
							snappedQuestions: [],
							snappedPreviews: [],
							zoomMeetings: null,
							mySoalan: null,
					}
			},

			/* push:
				* assignmentDetails.question -> questionDraft
				* assignmentDetails.question -> creatingQuestionDetails
			*/
			loadSavedQuestionForEdit(state, type) {
				// console.log('called loadSavedQuestionForEdit');

				Object.assign(state.questionDraft, state.assignmentDetails.question);
				Object.assign(state.creatingQuestionDetails, state.assignmentDetails.question);

				// somehow setting type cause uncontrollable stack overflow
				state.questionDraft.type = 'mySoalan';
				state.creatingQuestionDetails.type = 'mySoalan';

				/*
					state.questionDraft = {
							type: type,
							title: JSON.parse(JSON.stringify(state.assignmentDetails.question.title)),
							writtenQuestion: JSON.parse(JSON.stringify(state.assignmentDetails.question.writtenQuestion)),
							snappedQuestions: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedQuestions)),
							snappedPreviews: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedPreviews)),
							zoomMeetings: state.assignmentDetails.question.zoomMeetings,
							mySoalan: state.assignmentDetails.question.mySoalan,
					}

					state.creatingQuestionDetails = {
							type: type,
							title: JSON.parse(JSON.stringify(state.assignmentDetails.question.title)),
							writtenQuestion: JSON.parse(JSON.stringify(state.assignmentDetails.question.writtenQuestion)),
							snappedQuestions: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedQuestions)),
							snappedPreviews: JSON.parse(JSON.stringify(state.assignmentDetails.question.snappedPreviews)),
							zoomMeetings: state.assignmentDetails.question.zoomMeetings,
							mySoalan: state.assignmentDetails.question.mySoalan,
					}
				*/
			},


			setMeetingId(state, key) {
				state.states.meeting_id = key;
			},

			// init, basically everything to null.
			initialise(state) {

					// STATES
					state.states = {
							isMain: true,
							isCreatingQuestion: false,
							isCreatingZoomQuestion: false,
							isCreatingMySoalanQuestion: false,
							isInZoomMeeting: false,
							isSelectingDuration: false,
							isSelectingQuestionType: false,
							isWritingQuestion: false,
							isSnappingQuestion: false,
							isCroppingSnappedQuestion: false,
							isResettingQuestion: false,
							isShowingScheduler: false,
							isPublishing: false,
							isPublished: false,
							isShowingError: false,
							isInZoomMeeting: false,
							isVideoOn: false,
							isMicOn: false,
							isScreenShare: false,
							isRecording: false,
							meeting_id: null,
							isZoomPreview: false,
							isMySoalanQuestion: false,
							mySoalanInfo: null,
					};

					// Main details to be submitted
					state.assignmentDetails = {
							title: null,
							school_id: "",
							subject_id: "",
							classroom_id: null,
							due_datetime: null,
							auto_marking: false,
							question: {
									type: null,
									title: null,
									writtenQuestion: null,
									snappedQuestions: [],
									zoomeMeetings: null,
									mySoalan: null,
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
							zoomMeetings: null,
							mySoalan: null,
					}

					// Currently creating question details. To be used instantaneous.
					// When saved, load into question draft
					state.creatingQuestionDetails = {
							type: null,
							title: null,
							writtenQuestion: null,
							snappedQuestions: [],
							snappedPreviews: [],
							zoomMeetings: null,
							mySoalan: null,
					}

					state.selectables = {
						schools:[],
						subjects: [],
						classrooms: []
					}
			},

			loadAssignmentDetailFromSessionStorage(state){
				// console.log('call loadAssignmentDetailFromSessionStorage');

				// load from sessionStorage
				let assignmentDetailsFromSession = sessionStorage.getItem('assignmentDetails');
				let statesFromSession = sessionStorage.getItem('states');
				// console.log('sessionStorage', JSON.parse(assignmentDetailsFromSession));
	
				// should be the right solution, but sometimes it doesn't change the value
				// after you assign it.
				state.assignmentDetails = JSON.parse(assignmentDetailsFromSession);
				state.states = JSON.parse(statesFromSession);

				// should set assignmetnDetails.auto_marking to true because you should have mysoalan data
				state.assignmentDetails.auto_marking = true;

				// should remove sessionData after loading
				// sessionStorage.removeItem('assignmentDetails');
				// sessionStorage.removeItem('states');
			}, 

			toggleAutoMarking(state){
				state.assignmentDetails.auto_marking = !state.assignmentDetails.auto_marking;
			},

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
		beginWritingZoomQuestion({state, commit, getters}) {
			// triggered when user select zoom meeting question
			commit('toogleZoomQuestionMode');
			state.creatingQuestionDetails.type ='zoom';
		},
		beginWritingMySoalanQuestion({state, commit, getters}){
			console.log('attempt to start writing mysoalan question');
			commit('toggleMySoalanQuestionMode');
			state.creatingQuestionDetails.type = 'mySoalan';
		},
		cancelWritingMySoalanQuestion({state, commit}){
			commit('toggleMySoalanQuestionMode');
			state.creatingQuestionDetails.type = '';
		}, 
		removeMySoalanQuestion({state}){
			// console.log('remove mySoalan Question');

			// clear out from the question draft
			// state.questionDraft.mySoalan = null;
			state.creatingQuestionDetails.mySoalan = null;
			state.states.isCreatingMySoalanQuestion = false;

			// set auto_marking to false;
			state.assignmentDetails.auto_marking = false;
		},
		redirectToMySoalanSite({state, commit}, e){
			console.log('actual redirect to mysoalan site');

			/*
				should save localsession data before being redirected.
				- move from creatingQuestionDetail -> questionDraft
				- also move from questionDraft -> assignmentDetail, then save changes. 
			*/
			commit('saveQuestionToDraft', state);
			commit('saveQuestionToAssignmentDetails', state);

			let assignmentDetailsState = JSON.stringify(state.assignmentDetails);
			let statesState = JSON.stringify(state.states);

			// console.log('assignmentDetailsState', assignmentDetailsState);
			// sessionStorage.removeItem("assignmentDetails");
			sessionStorage.setItem("assignmentDetails", assignmentDetailsState);
			sessionStorage.setItem("states", statesState);
			sessionStorage.setItem('loadedMySoalan', '');
			
			// now do the actual redirect
			let redirect = window.location.host + window.location.pathname;
			//let redirect = 'mobile.gotsnapped.tech/teacher/assignments/create'
			let subject = e.subject;
			let level = e.level;
			let q_url = 'https://snapped.mysoalan.com/papers';
			let access_t = '';

			axios.post(auth_url,{
				teacherEmail: e.email,
			}, {
				headers: {'Authorization': `Basic ${token}`},
			}).then((res) => {
				console.log('res', res);
				access_t = res.data.accessToken;

				console.log('access_t', access_t);
				// redirect to url
				window.location.replace(`${q_url}?token=${access_t}&redirect-url=${redirect}&subject=${subject}&level=${level}`);
			}).catch((e) => {
				console.log('error', e.response.message);
			});
		},
		clearSessionData(){
			sessionStorage.removeItem('assignmentDetails');
			sessionStorage.removeItem('states');
		},
		saveWrittenQuestionToDraft({state, commit, getters}) {
			// console.log('call saveWrittenQuestionToDraft');
			if (state.creatingQuestionDetails.writtenQuestion) {
				commit('toggleWritingQuestionMode')
				commit('saveQuestionToDraft')
			} else {
				commit('toggleShowingErrorMode')
			}
		},
		endWritingQuestion({state, getters, commit}) {
			// Exits writing question mode and return to Create/Edit question
			// If written draft exist, reload it into creatingQuestionDetails
			// Else, empty the creatingQuestionDetails and trigger Select Question mode
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
			state.questionDraft.writtenQuestion = null;
			state.creatingQuestionDetails.writtenQuestion = null;

			// commit('resetCreatingQuestion')
		},
		beginSnappingQuestion({state, getters, commit}) {
			if (!state.states.isSnappingQuestion) {
				commit('toggleSnappingQuestionMode');
				state.creatingQuestionDetails.type = 'snapped';
			}
		},
		handleSnapQuestion({state, getters, commit, dispatch}, e) {
			console.log('handleSnappedQuestion', e);
			let files = e.target.files || e.dataTransfer.files

			if (!files.length) { return }

			let fileList = Array.prototype.slice.call(e.target.files);

			fileList.forEach(f => {
				if (!f.type.match("image.*")) { return; }

				let reader = new FileReader();

				reader.onload = (e) => {
					state.creatingQuestionDetails.snappedQuestions.push(e.target.result)
					state.creatingQuestionDetails.snappedPreviews.push({
						source: e.target.result,
						preview: true,
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

			/*
			if (!state.creatingQuestionDetails.snappedQuestions.length) {
				commit('resetCreatingQuestion')
				commit('toggleSnappingQuestionMode')
			}
			*/
		},
		handleZoomQuestion({state, commit}, payload) {
			// handled when recording stops
			// payload should be the zoom recording file in blob
			console.log('trigger when new video stored');

			state.creatingQuestionDetails.zoomMeetings = payload;
			console.log('payload', payload);
		},
		saveZoomQuestionToDraft({state, commit}) {
			//pushing questionDetails.zoomMeetings to assignmentDetails.question
			console.log('saving zoom question draf')

			commit('saveQuestionToDraft');

			if(state.creatingQuestionDetails.zoomMeetings) {
				commit('toogleZoomQuestionMode');
			} else {
				commit('toggleShowingErrorMode');
				}
		},
		closeToggleDuration() {
			// MODE: MODAL
			if (this.durationDay === '') { this.durationDay = 0 }
			if (this.durationHour === '') { this.durationHour = 0 }
			if (this.durationMinute === '') { this.durationMinute = 0 }

			this.toggleDuration = !this.toggleDuration
		},
		getSchools({state}){
			TeacherRepository
				.getTeacherSchools()
				.then(res => {
					// console.log('res', res.data);
					res.data.forEach(item => {
						state.selectables.schools.push({
							id: item.id, 
							name: item.name
						});
					})
					// update state.selectables.schools
				})

		},
		getSubjects({state}) {
			TeacherRepository
				.getTeacherSubjects()
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
		/*
			get classes
			- should be based on current school.
		*/
		getClasses({state, commit}) {
			TeacherRepository
			// .getTeacherClasses()
			.getTeacherClassesBySchool(state.assignmentDetails.school_id)
			.then(response => {
				if (response.data.success) {
					// clear selected and selectables
					state.selectables.classrooms = [];
					state.assignmentDetails.classroom_id = [];

					const data = response.data.data
					for (let i = 0; i < data.length; i++) {
						let item = data[i];
						let classDetail = {
							id: item.class_id,
							name: item.class_name,
							numOfStudents: item.num_of_students,
							isHomeroom: item.homeroom,
						}
						state.selectables.classrooms.push(classDetail);
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
			// console.log('call saveQuestion');

			// Check if user selected a type of question
			if (state.creatingQuestionDetails.type) {

			// Check if user has inserted a question title
			if (state.creatingQuestionDetails.title) {
				// all this will need to be reviewed

				commit('saveQuestionToDraft')
				commit('saveQuestionToAssignmentDetails');
				commit('resetCreatingQuestion')
				commit('toggleCreatingQuestionMode')

				/*
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

				// if user opt to zoom question
				if (getters.creatingQuestionType === 'zoom') {
					console.log('saving zoom question');

					commit('saveQuestionToDraft');
					if (getters.hasZoomQuestionDraft) {
						commit('saveQuestionToAssignmentDetails');
						commit('resetCreatingQuestion')
						commit('toggleCreatingQuestionMode')
					} else {
						console.log('please record something');
					}
					// plan. sanitize and push to server
				}

				// if the assignment has mySoalan assignment uuid
				if (getters.creatingQuestionType === 'mySoalan'){
					console.log('should save mysoalan type');
					commit('saveQuestionToDraft');
					if (getters.hasMySoalanQuestionDraft) {
						console.log('hasMySoalanQuestionDraft');
						console.log('saveQuestion: questionDraft.mysoalan', state.questionDraft.mySoalan);

						commit('saveQuestionToAssignmentDetails');
						commit('resetCreatingQuestion')
						commit('toggleCreatingQuestionMode')
					} else {
						console.log('mysoalan issue');
					}
				}
				*/
			} else {
				console.log('please fill in title');
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
		},
		checkForm({state, commit, getters}) {
			// Reset error
			state.errors = [];

			if (!state.assignmentDetails.title) { state.errors.push('Title required.'); }
			if (!state.assignmentDetails.subject_id) { state.errors.push('Subject required.'); }
			if (!state.assignmentDetails.classroom_id) { state.errors.push('Classroom required.'); }
			if (!getters.hasSavedQuestion) { state.errors.push('Question required.'); }
			if (!state.assignmentDetails.due_datetime) { state.errors.push('Due date required'); }
			if (state.errors.length) { commit('toggleShowingErrorMode') }
		},
		async sendData({state, commit, getters, dispatch}) {
			// send data to the server

			dispatch('checkForm');

			if (!getters.hasErrors) {
				let counter = 0;
				let zoom_meeting = null;

				if (state.states.isShowingScheduler) {
					commit('toggleShowingSchedulerMode')
				}

				commit('togglePublishingMode')
				commit('toggleShowingSchedulerMode')

				// from lavarel code, it seems push the video to the server first and to get meeting
				// and then push the assignment  details

				// pre-flight check: see if it's a zoom meeting video.
				// if it's a zoom meeting, upload the video first and update assignment details
				console.log('check if got zoom video');
				//if(state.assignmentDetails.question.type === 'zoom'){
				if(state.assignmentDetails.question.zoomMeetings !== null){
					let formData = new FormData();
					const path = '/zoom-meeting/push_s3';
					let recUrl = state.assignmentDetails.question.zoomMeetings;
					console.log('recovering video from ', recUrl);

					console.log('getting the video file');
					let recBlob = await fetch(recUrl).then( r =>
						r.blob()).then(blobFile => new File([blobFile], "test.webm", { type: "video/webm"})
					);

					formData.append('zoomMeetings', recBlob);

					await Repository.post(path, formData,   {
						headers: { 'Content-Type': 'multipart/form-data' }
					}).then( (res) => {
						zoom_meeting = res.data.zoom_meeting;
						console.log('res', res);
					});
				}
				console.log('done sending a zoom video', zoom_meeting);

				console.log('pushing the assignment detail');
				// push the assignment details for each class.
				state.assignmentDetails.classroom_id.forEach((classroom, index) => {

				let formData = new FormData();

				formData.append('subject_id', state.assignmentDetails.subject_id);
				formData.append('school_id', state.assignmentDetails.school_id);
				formData.append('class_id', classroom.id);
				formData.append('title', state.assignmentDetails.title);
				formData.append('written_question_title', state.assignmentDetails.question.title);
				formData.append('written_description', state.assignmentDetails.question.writtenQuestion ?? '');
				formData.append('due_datetime', moment(state.assignmentDetails.due_datetime).format('YYYY-MM-DD HH:mm:ss'));
				formData.append('published_at', moment(state.assignmentDetails.published_at).format('YYYY-MM-DD HH:mm:ss'));
				formData.append('remarks', state.assignmentDetails.remarks ?? '');
				formData.append('recording_meeting_id', zoom_meeting ? zoom_meeting.meeting_id : '');
				formData.append('mysoalan', state.assignmentDetails.question.mySoalan);
				formData.append('auto_marking', state.assignmentDetails.auto_marking ? 1 : 0);

				for (let i = 0; i < state.assignmentDetails.question.snappedQuestions.length; i++) {
					let file = state.assignmentDetails.question.snappedQuestions[i];
					formData.append('snap_question[' + i + ']', file);
				}

				// the part where actually save the assignment
				Repository.post('/assignments/store', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

				console.log('done sending the assignment to db');
			}
		},
		testRecordMeeting({state, commit}){
			// test the past where posting to '/zoom-meeting/store'
			//const host = 'https://admin.gotsnapped.tech/api';
			const host = 'http://localhost:8000/api';
			const path = '/zoom-meeting/store';
			const topic = "test meeting"
			let formData = new FormData();

			formData.append('topic', topic);
			formData.append('agenda', topic);
			formData.append('duration', '5');
			formData.append('host_video', '1');
			formData.append('participant_video', '1');


			Repository.post(path, formData).then((res) => {
				console.log('response', res);

				console.log('data', res.data.data);
				console.log('meetind_id', res.data.data.id);
				commit('setMeetingId', res.data.data.id);

				console.log('meeting_url', res.data.data.join_url);
			})

		},
		testGetMeetingRecordings({state}){
			// retrive meeting recordings from state.states.meeting_id
			console.log('meeting_id is ', state.states.meeting_id);

			if(state.states.meeting_id) {
				const path = '/zoom-meeting/' + state.states.meeting_id + '/recordings';
				console.log('getting recordings from ', path);
				Repository.get(path).then( (res) => {
					console.log('res', res);
				})
			}
		},
		async testSendRecordings({state }){
			console.log('in testSendRecordings');
			const path = '/zoom-meeting/push_s3';

			/*
				plan:-
				for testing, see if i can push the file contents from
					questionDetails.zoomMeetings to the server and eventually to s3.
			*/

			//validation, ensure the zoomMeetings is populated
			/*
			if(!state.assignmentDetails.zoomMeetings){
				console.log('plese record a video');
			}
			*/

			// build up formData
			let formData = new FormData();
			let recUrl = state.creatingQuestionDetails.zoomMeetings;
			let recBlob = await fetch(recUrl).then( r =>
				r.blob()).then(blobFile =>
					new File([blobFile], "test.webm", { type: "video/webm"})
			);
			formData.append('zoomMeetings', recBlob);
			Repository.post(path, formData,   {
				headers: { 'Content-Type': 'multipart/form-data' }
			}).then( (res) => {
				console.log('res', res);
			});
		},
		getDetails: function () {
			TeacherRepository
			.getTeacherDetails()
			.then(response => {
				if (response.data.success) {
						const data = response.data.data[0]

						let teacherDetail = { id: data.id, }

						localStorage.setItem('teacherID', teacherDetail.id)
				}
			})
		},
		setAssignmentTitle({state}, maxedTitle) {
			state.assignmentDetails.title = maxedTitle;
		},
		/* 
			set the mysoalan assignment id
			- usually being used after being redirect
			- should also load localstorage/localsession data
		*/
		setMySoalanAssignID(state, key){
			// console.log('setMySoalanAssignID');

			state.state.questionDraft.mySoalan = key;
			state.state.assignmentDetails.question.mySoalan = key;
			state.state.creatingQuestionDetails.mySoalan = key;
			state.state.creatingQuestionDetails.type='mySoalan';
		},
		async getMySoalanInfo(state){// 
			// console.log('teacherCreateAssignment: getting mysoalan info');

			let access_t = '';
			let assign_info_url = `https://api.mysoalan.com/v1/assign-papers/${state.state.questionDraft.mySoalan}`;

			// get access token
			await axios.post(auth_url, {
				teacherEmail: 'cikgumaria@snapped.com',
			}, {
				headers: {
					'Authorization': `Basic ${token}`,
				},
			}).then((res) => {
				access_t = res.data.accessToken;
				// console.log('access_t', access_t);
			});

			// get mysoalan info
			await axios.get(assign_info_url, {
				headers: {
					'Authorization': `Bearer ${access_t}`,
				},
			}).then((res) => {
				// console.log('assign info', res);
				state.state.states.mySoalanInfo = res.data;
			}).catch((e) => {
				console.log('failed to get assignment info');
			});
		},
		loadSessionData({state, commit, dispatch}){
			// console.log('called loadSessionData');
			/*
				- go into creating question mode
				- load assignment detail from session storage
				- move assignment detail to questionDraft / creatingQuestionDetails
				- remove sessionData after loading
			*/

      commit('toggleCreatingQuestionMode');
			commit('loadAssignmentDetailFromSessionStorage', state);
			commit('loadSavedQuestionForEdit', state, 'mySoalan');
		}
	},
	getters: {
		creatingQuestionType: (state) => { return state.creatingQuestionDetails.type; },
		savedQuestionType: (state) => { return state.assignmentDetails.question.type; },
		dueDateTime(state) { return moment(state.assignmentDetails.due_datetime).format('DD/MM/YYYY') },
		snappedPreviews(state) { return state.assignmentDetails.question.snappedQuestions; },
		hasSavedQuestion: (state) => {
			return state.assignmentDetails.question.type && (
				state.assignmentDetails.question.writtenQuestion ||
				state.assignmentDetails.question.snappedQuestions.length ||
				state.assignmentDetails.question.zoomMeetings !== null ||
				state.assignmentDetails.question.mySoalan !== null
			);
		},
		hasSavedDueDatetime: (state) => {
				return state.assignmentDetails.due_datetime !== null;
		},
		hasEditableQuestion(state, getters) {
				return state.states.isCreatingQuestion 
					&& !state.states.isWritingQuestion 
					&& (getters.hasWrittenQuestionDraft || getters.hasSnappedQuestionDraft)
		},
		hasWrittenQuestionDraft: (state) => {
				// return state.questionDraft.type ? (state.questionDraft.type === 'written' && state.questionDraft.writtenQuestion) : false;
				return state.questionDraft.writtenQuestion !== null;
		},
		isEditingWrittenQuestion: (state) => {
			return state.states.isWritingQuestion;
		},
		isEditingZoomQuestion: (state) => {
			return state.states.isCreatingZoomQuestion; 
		},
		isEditingMySoalanQuestion: (state) => {
			return state.states.isCreatingMySoalanQuestion;
		},
		hasSnappedQuestionDraft(state) {
			// return state.questionDraft.type ? state.questionDraft.type === 'snapped' && state.questionDraft.snappedQuestions.length > 0 : false;
			//return state.questionDraft.snappedQuestions.length > 0 || state.creatingQuestionDetails.snappedPreviews.length > 0; 
			// console.log('getting hasSnappedQuestionDraft');
			return state.creatingQuestionDetails.snappedPreviews.length > 0; 
		},
		hasZoomQuestionDraft(state){
			// return state.questionDraft.type ?  state.questionDraft.type === 'zoom' && state.questionDraft.zoomMeetings !== null : false;
			return state.questionDraft.zoomMeetings != null;
		},
		hasMySoalanQuestionDraft(state){
			return state.creatingQuestionDetails.mySoalan != null;
			// return state.questionDraft.mySoalan != null;
		},
		hasMySoalanQuestion(state){
			return state.assignmentDetails.question.mySoalan != null;
		},
		isMySoalanExclusive(state){
			// returns true is assignmentDetails.question.mysoalan is populated, and others are not.
			// only at assignmentDetails.question level
			let question = state.assignmentDetails.question;
			return question.mySoalan != null && (
				question.zoomMeetings == null && question.snappedPreviews.length == 0 && question.writtenQuestion == null
			);
		},
		hasErrors(state) { return state.errors.length || state.states.isShowingError },
		hasZoomMeeting(state) { return state.states.isInZoomMeeting; },
		hasZoomVideo(state) { return state.states.isVideoOn; },
		hasZoomMic(state) { return state.states.isMicOn; },
		hasZoomScreenShare(state) { return state.states.isScreenShare; },
		hasZoomRecording(state) { return state.states.isRecording; },
	}
}
