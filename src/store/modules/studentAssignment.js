
export default {
	namespaced: true,
	state: () => ({
		assignmentDetails: {},
		answer: {},
	}),
	mutations:{
		setAssignmentDetail(state, payload){
			state.assignmentDetails = payload;
		},
		setAnswer(state, payload){
			state.answer = payload;
		},
		resetState(state){
			state.assignmentDetails = {};
			state.answer = {};
		}
	},
	actions: {},
	getters: {
		assignmentDetails(state){
			return state.assignmentDetails;
		},
		answer(state){
			return state.answer;
		}
	},
}