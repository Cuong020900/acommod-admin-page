const initialState = {
    userName: '',
    avatar: '',
    userRole: ''
}

export const userInfo = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN": {
        return { ...state, userName: action.payload.userName, avatar: action.payload.avatar }
      }
      default: {
        return state
      }
    }
  }
  