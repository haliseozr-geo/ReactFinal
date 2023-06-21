import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function checkLoginReducer(state = initialState.currentUser, action) {
    switch (action.type) {
        case actionTypes.GET_USERNAME_PASSWORD_SUCCESS:
            return action.payload
        default:
            return state;
    }
}