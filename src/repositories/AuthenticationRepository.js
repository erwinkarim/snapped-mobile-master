import Repository from "@/repositories/Repository";
import axios from "axios";

const resource = "/user";

export default {

    login(payload) {
        return Repository.post(`${resource}/login`, payload)
    },

    register(payload) {
        return Repository.post(`${resource}/register`, payload)
    },

    logout(payload) {

    }

}
