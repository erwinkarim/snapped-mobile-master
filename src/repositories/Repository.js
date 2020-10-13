import axios from "axios"

const baseDomain = '';
const baseURL = '${baseDomain}/api';

export default axios.create({
  baseURL,
  headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
  }
})
