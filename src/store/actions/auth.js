import * as actionTypes from './actionTypes';

import axios from 'axios';

const parseErrorMessage = (isSignUp, errorCode) => {
    let errorMessage = null;
    if (isSignUp) {
        switch(errorCode) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.'
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.'
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
                break;
            default:
            // do nothing
        }
    } else {
        switch(errorCode) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.'
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.'
                break;
            default:
            // do nothing
        }
    }
    return errorMessage;
}

export const asyncAuthActions = {
    authSuccess: (idToken, userId) => {
        return {
            type: actionTypes.AUTH_SUCCESS,
            idToken: idToken,
            userId: userId
        }
    },
    authFail: (error) => {
        return {
            type: actionTypes.AUTH_FAIL,
            error: error
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');
        return {
            type: actionTypes.AUTH_LOGOUT
        }
    },
    checkAuthTimeout: (expirationTime) => {
        return dispatch => {
            setTimeout(() => {
                dispatch(asyncAuthActions.logout());
            }, expirationTime * 1000);
        }
    },
}

export const authCreators = {
    authStart: () => {
        return {
            type: actionTypes.AUTH_START
        }
    },
    authHandler: (email, password, isSignUp) => {
        return dispatch => {
            dispatch(authCreators.authStart());
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCx80Ex-IvnkkB1mKhfX-wL8_lKvEePUiQ';
            if (!isSignUp) {
                url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCx80Ex-IvnkkB1mKhfX-wL8_lKvEePUiQ'
            }
            axios.post(url, authData)
            .then(response => {
                const expirationDate =  new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(asyncAuthActions.authSuccess(response.data.idToken, response.data.localId));
                dispatch(asyncAuthActions.checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                let errorMessage = parseErrorMessage(isSignUp, error.response.data.error.message);
                dispatch(asyncAuthActions.authFail(errorMessage));
            })
        }
    },
    setAuthRedirectPath: (path) => {
        return {
            type: actionTypes.AUTH_SET_REDIRECT_PATH,
            path: path
        }
    },
    authCheckState: () => {
        return dispatch => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(asyncAuthActions.logout());
            } else {
                const userId = localStorage.getItem('userId');
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= new Date()) {
                    dispatch(asyncAuthActions.logout());
                }
                dispatch(asyncAuthActions.authSuccess(token, userId));
                dispatch(asyncAuthActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}