import axios from "axios"
import authHeader from "./auth.header"

var API_URL = 'http://localhost:3000/Api/'

const createModuleService = (data) => {
    return axios.post(API_URL + "createModule", data, {
        headers: authHeader()
    })
}

const editModuleService = (data) => {
    return axios.post(API_URL + "editModule" , data, {
        headers: authHeader()
    })
}

const moduleListingService = () => {
    return axios.get(API_URL + "listingModule", {
        headers: authHeader()
    })
}

const viewModuleService = (id) => {
    return axios.get(API_URL + "viewModule" + id, {
        headers: authHeader()
    })
}
const deleteModuleService = (id) => {
    return axios.delete(API_URL + "deleteModule" + id, {
        headers: authHeader()
    })
}
export default {
    createModuleService,
    editModuleService,
    moduleListingService,
    deleteModuleService,
    viewModuleService
}