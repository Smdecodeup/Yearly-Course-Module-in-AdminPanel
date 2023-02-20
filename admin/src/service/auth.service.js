import axios from "axios"

var API_URL = 'http://localhost:3000/Api/'

const authUser = (data) => {
    return axios.post(API_URL + "users/Login", data)
}

export default authUser;