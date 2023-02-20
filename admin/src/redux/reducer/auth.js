import { LOGIN_SUCCESS } from "../action/type";

const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
const auth = JSON.parse(localStorage.getItem('auth'))
const Authorization = localStorage.getItem('Authorization')
const initialState = {
    isLoggedIn: isLoggedIn || false,
    auth: auth,
    Authorization: Authorization
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                auth: payload,
                Authorization: Authorization
            }
        default:
            return state
    }
}