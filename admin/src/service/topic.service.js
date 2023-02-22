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

export default {
    topicListingService,
    topicCreateService
};