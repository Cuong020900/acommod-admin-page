import { combineReducers } from "redux"
import { login } from "./loginReducer"
import { userInfo } from "./userInfoReducer"

const authReducers = combineReducers({
  login,
  userInfo
})

export default authReducers
