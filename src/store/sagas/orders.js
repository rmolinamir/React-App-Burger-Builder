import { put } from 'redux-saga/effects';

import { asyncOrderActions } from '../actions/orders';

import axios from '../../axios-orders';

export const ordersSagas = {
    getOrdersHandlerSaga: function* (action) {
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        try {
            const response = yield axios.get('/orders.json' + queryParams);
            yield put(asyncOrderActions.getOrdersHandler(response.data));
        } catch (error) {
            yield put(asyncOrderActions.getOrdersFailed());
        }
    }
}