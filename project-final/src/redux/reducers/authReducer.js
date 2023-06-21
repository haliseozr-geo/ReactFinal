
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
            };
        case actionTypes.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
