import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    });

    it('should return the initial state', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-user-id'})).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    });
});