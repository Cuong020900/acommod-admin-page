import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import navbar from "./navbar/Index"
import chatReducer from "./chat/"

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  chatApp: chatReducer,
  navbar: navbar
})

export default rootReducer
