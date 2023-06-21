import { combineReducers } from "redux"
import changeCategoryReducer from "./changeCategoryReducer"
import categoryListReducer from "./categoryListReducer"
import productListReducer from "./productListReducer"
import cartReducer from "./cartReducer"
import checkLoginReducer from "./checkLoginReducer"
import authReducer from "./authReducer"

const rootReducer = combineReducers({
    changeCategoryReducer,
    categoryListReducer,
    productListReducer,
    cartReducer,
    checkLoginReducer,
    authReducer

})

export default rootReducer;