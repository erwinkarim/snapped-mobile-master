/*
	to get mysoalan data
*/

import Repository from "@/repositories/Repository";
import axios from "axios"
let id = process.env.VUE_APP_MYSOALAN_KEY;
let secret = process.env.VUE_APP_MYSOALAN_SECRET;

// create token
const token = Buffer.from(`${id}:${secret}`, 'utf8').toString('base64');
let auth_url = 'https://api.mysoalan.com/v1/intg/oauth';
let data_url = 'https://api.mysoalan.com/v1/assign-papers/';

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
	}

};