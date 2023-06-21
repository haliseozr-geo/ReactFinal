import * as actionTypes from "./actionTypes";


export function getUsernamePasswordSuccess(user) {
    return { type: actionTypes.GET_USERNAME_PASSWORD_SUCCESS, payload: user };
}

export function getUsernamePassword(username, password) {
    return function (dispatch) {
        let url = "http://localhost:3000/users";
        console.log(username)
        console.log(password)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var user = data.find(x => x.username === username && x.password === password);
                if (user) {
                    dispatch(getUsernamePasswordSuccess(user));
                }
            })
    }
}



export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER',
    };
};

