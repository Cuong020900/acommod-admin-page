export const getUserInfo = (data) => {
    let path = "https://localhost:5000/api/Login/login"
    return dispatch => {
    fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }).then(e => e.json()).then(e => {
            dispatch({ type: "LOGIN", payload: e })
            localStorage.setItem('userName', e.userName)
            localStorage.setItem('userId', e.id)
        })
    }
}

export const setUserInfo = (data) => {
    return dispatch => {
        dispatch({ type: "LOGIN", payload: data })
        localStorage.setItem('userName', data.userName)
        localStorage.setItem('userId', data.id)
    }
}