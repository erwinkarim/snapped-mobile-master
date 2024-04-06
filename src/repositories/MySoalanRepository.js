/*
	to get mysoalan data
*/

import Repository from "@/repositories/Repository";
import {Buffer} from 'buffer';
import axios from "axios"
let id = process.env.VUE_APP_MYSOALAN_KEY;
let secret = process.env.VUE_APP_MYSOALAN_SECRET;

// create token
const token = Buffer.from(`${id}:${secret}`, 'utf8').toString('base64');
let auth_url = 'https://api.mysoalan.com/v1/intg/oauth';
let data_url = 'https://api.mysoalan.com/v1/assign-papers/';
let base_url = 'https://api.mysoalan.com/v1/';

export default {
	getAccessToken(email, role){
		let emailOption = role == 'Student' ? { studentEmail: email} : { teacherEmail: email };
		return axios.post(auth_url, emailOption, {
			headers: { 'Authorization': `Basic ${token}` },
		});
	},
	teacher_token(email){
		return axios.post(auth_url, {
			teacherEmail: email,
		}, {
			headers: {
				'Authorization': `Basic ${token}`,
			},
		});
	},
	student_token(email){
		return axios.post(auth_url, {
			studentEmail: email,
		}, {
			headers: {
				'Authorization': `Basic ${token}`,
			},
		});
	},
	showPaper(paper_uuid, access_t){
		return axios.get(`${data_url}${paper_uuid}`, {
			'headers': {
				'Authorization': `Bearer ${access_t}`,
			}
		})
	}, 
	getResult(result_uuid, access_t){
		// get results based on result_uuid
		// also get more details based on results_uuid
		return axios.get(`${base_url}results/${result_uuid}`, {
			'headers': {
				'Authorization': `Bearer ${access_t}`,
			}
		})
	},
	getResultSubmission(result_uuid, access_t){
		// get more details results based on result_uuid
		// thinking of incorp both
		return axios.get(`${base_url}results/${result_uuid}/questions`, {
			'headers': {
				'Authorization': `Bearer ${access_t}`,
			}
		})

	},
	getPaperSubmission(assign_paper_uuid, access_t){
		// get performance of students in a assign_paper_uuid
		return axios.get(`${data_url}${assign_paper_uuid}/questions`, {
			'headers': {
				'Authorization': `Bearer ${access_t}`,
			}
		})
	},

	viewAssignPapers(assign_paper_uuid, access_t, return_url){
		return `https://snapped.mysoalan.com/assign-papers/${assign_paper_uuid}/paper?token=${access_t}&redirect-url=${return_url}`;
	}



};