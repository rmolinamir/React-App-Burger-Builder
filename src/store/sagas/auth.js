import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import { asyncAuthActions, parseErrorMessage } from '../actions/auth';

// export function* logoutSaga (action) {
//     yield localStorage.removeItem('token');
//     yield localStorage.removeItem('userId');
//     yield localStorage.removeItem('expirationDate');
//     yield put({
//         type: actionTypes.AUTH_LOGOUT
//     });
// }

export const authSagas = {
    logoutSaga: function* () {
        yield call([localStorage, 'removeItem'], 'token');  
        yield call([localStorage, 'removeItem'], 'userId');  
        yield call([localStorage, 'removeItem'], 'expirationDate');
        yield put(asyncAuthActions.authLogoutSucceed());
    },
    checkAuthTimeoutSaga: function* (action) {
        yield delay(action.expirationTime*1000);
        yield put(asyncAuthActions.authLogoutSucceed());
    },
    authUserSaga: function* (action) {
        yield put(asyncAuthActions.authStart());
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCx80Ex-IvnkkB1mKhfX-wL8_lKvEePUiQ';
        if (!action.isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCx80Ex-IvnkkB1mKhfX-wL8_lKvEePUiQ'
        }
        try {
            const response = yield axios.post(url, authData)
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('userId', response.data.localId);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield put(asyncAuthActions.authSuccess(response.data.idToken, response.data.localId));
            yield put(asyncAuthActions.checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            const errorMessage = yield parseErrorMessage(action.isSignUp, error.response.data.error.message);
            yield put(asyncAuthActions.authFail(errorMessage));
        }
    },
    authCheckStateSaga: function* (action) {
        const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(asyncAuthActions.authLogout());
        } else {
            const userId = yield localStorage.getItem('userId');
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                yield put(asyncAuthActions.authLogout());
            }
            yield put(asyncAuthActions.authSuccess(token, userId));
            yield put(asyncAuthActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}