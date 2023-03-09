import axios from "axios"
import authHeader from "./auth.header"

var API_URL = 'http://localhost:3000/Api/topic'

const topicListingService = () => {
    return axios.get(API_URL + "/listingTopic", {
        headers: authHeader()
    })
}

const topicCreateService = (data) => {
    return axios.post(API_URL + "/createTopic", data, {
        headers: authHeader()
    })
}

const topicDeleteService = (id) => {
    return axios.delete(API_URL + "/deleteTopic" + id, {
        headers: authHeader()
    })
}
const topicViewService = (id) => {
    return axios.get(API_URL + "/viewTopic" + id, {
        headers: authHeader()
    })
}

const topicEditService = (id, data) => {
    return axios.post(API_URL + "/editTopic?id=" + id, data, {
        headers: authHeader()
    })
}


export default {
    topicListingService,
    topicCreateService,
    topicDeleteService,
    topicViewService,
    topicEditService
};