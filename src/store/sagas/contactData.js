import { put } from 'redux-saga/effects';

import { asyncPurchaseActions, contactDataCreators } from '../actions/contactData'

import axios from '../../axios-orders';

export const contactDataSagas = {
    purchaseOrderHandlerSaga: function* (action) {
        yield put(contactDataCreators.purchaseOrderStart());
        try {
            yield put(asyncPurchaseActions.resetIngredients());
            const response = yield axios.post('/orders.json?auth=' + action.token, action.order);
            yield put(asyncPurchaseActions.successPurchaseOrderHandler(response.data.name, action.order));
        } catch (error) {
            put(asyncPurchaseActions.failedPurchaseOrderHandler(error));
        }
    }
}
