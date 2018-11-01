import * as actionTypes from '../actions/actionTypes';

import { updateObject } from './updateObject';

const initialState = {
    orders: [],
    purchasing: false,
    loading: false,
}

const contactDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchasing: true});
        case actionTypes.PURCHASE_ORDER_START:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_ORDER_FAIL:
            return updateObject(state, {loading: false});
        case actionTypes.PURCHASE_ORDER_SUCCESS:
            const newOrder = {
                orderId: action.orderId,
                orderData: action.orderData
            }
            return updateObject(state, { orders: state.orders.concat(newOrder), purchasing: false, loading: false});
        default:
            // do nothing
    }
    return state;
}

export default contactDataReducer;