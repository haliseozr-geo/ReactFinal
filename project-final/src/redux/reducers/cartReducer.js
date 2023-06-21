import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            var addedItem = state.find(c => c.product.id === action.payload.id);
            if (addedItem) {
                return state;
            } else {
                return [...state, { ...action.payload }];
            }
        case actionTypes.REMOVE_FROM_CART:
            const newState = state.filter(cartItem => cartItem.product.id !== action.payload.id);
            return newState;
        default:
            return state;
    }
}
