export const changeRole = () => {
    return dispatch => {
        fetch('https://5fb733be8e07f00016642889.mockapi.io/login/3').then(e => e.json()).then(e => {
            dispatch({ type: "LOGIN", payload: e })
        })
    }
  }
  