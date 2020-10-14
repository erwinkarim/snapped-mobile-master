import axios from "axios"
import store from "@/store/index"

const baseDomain = 'http://snapped-system.test';
const baseURL = `${baseDomain}/api`;

const Repository = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})

Repository.interceptors.request.use(
    config => {
        const token = store.getters.getToken

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else  {
            delete Repository.defaults.headers.common.Authorization
        }

        return config
    },
    error => Promise.reject(error)
)

export default Repository;

