import * as actionTypes from './actionTypes';

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
    };
};

export const registerFailure = (error) => {
    return {
        type: actionTypes.REGISTER_FAILURE,
        payload: error,
    };
};

export const register = (userData) => {
    return (dispatch) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (response.ok) {
                    //alert('Kullanıcı başarıyla kaydedildi!');
                    dispatch(registerSuccess());
                } else {
                    throw new Error('Kullanıcı kaydedilemedi! Lütfen geçerli kullanıcı bilgileri girin.');
                }
            })
            .catch((error) => {
                //alert(error.message);
                dispatch(registerFailure(error.message));
            });
    };
};
