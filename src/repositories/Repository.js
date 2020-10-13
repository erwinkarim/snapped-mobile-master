import axios from "axios"

const baseDomain = 'http://snapped-system.test';
const baseURL = `${baseDomain}/api`;

let token = localStorage.getItem('token');

export default axios.create({
  baseURL,
  headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
  }
})
