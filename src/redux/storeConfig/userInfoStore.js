import { createStore } from 'redux'

import reducer from '../reducers/auth/userInfoReducer'

export default createStore(reducer)