import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import { burgerBuilderSagas } from './burgerBuilder';
import { authSagas } from './auth';
import { ordersSagas } from './orders';
import { contactDataSagas } from './contactData';

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth () {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_STATE, authSagas.authCheckStateSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authSagas.logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSagas.authUserSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.GET_INITIAL_INGREDIENTS, burgerBuilderSagas.initialIngredientsHandlerSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.INIT_GET_ORDERS, ordersSagas.getOrdersHandlerSaga);
}

export function* watchContactData() {
    yield takeLatest(actionTypes.PURCHASE_HANDLER, contactDataSagas.purchaseOrderHandlerSaga);
}