import { TOPIC_ID } from "../action/type"

const initialState = {
    topic_Id: ""
}
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case TOPIC_ID:
            return {
                ...state,
                topic_Id: payload,
            }
            default:
                return state
    }
}