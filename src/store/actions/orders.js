import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const asyncOrderActions = {
    setOrdersHandler: (orders) => {
        return {
            type: actionTypes.GET_ORDERS,
            orders: orders
        }
    },
    setOrdersFailed: () => {
        return {
            type: actionTypes.GET_ORDERS_FAILED,
        }
    }
}

export const ordersCreators = {
    getOrdersHandler: () => {
        return dispatch => {
            axios.get('/orders.json')
            .then( response => {
                dispatch(asyncOrderActions.setOrdersHandler(response.data));
            })
            .catch(error => {
                dispatch(asyncOrderActions.setOrdersFailed());
            });
        }
    }
}