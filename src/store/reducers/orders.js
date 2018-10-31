import * as actionTypes from '../actions/actionTypes';

import { updateObject } from './updateObject';

const initialState = {
    orders: [],
    error: false,
}

const ordersReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ORDERS_FAILED:
            return updateObject(state, {error: true});
        case actionTypes.GET_ORDERS:
            return updateObject(state, {orders: action.orders, error: false});
        default:
            // do nothing
    }
    return state;
}

export default ordersReducer;