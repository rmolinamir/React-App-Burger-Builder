import * as actionTypes from './actionTypes';

// import axios from '../../axios-orders';

export const asyncOrderActions = {
    getOrdersHandler: (orders) => {
        return {
            type: actionTypes.GET_ORDERS,
            orders: orders
        }
    },
    getOrdersFailed: () => {
        return {
            type: actionTypes.GET_ORDERS_FAILED,
        }
    }
}

export const ordersCreators = {
    getOrdersHandler: (token, userId) => {
        // return () => {
            // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
            // axios.get('/orders.json' + queryParams)
            // .then( response => {
            //     dispatch(asyncOrderActions.getOrdersHandler(response.data));
            // })
            // .catch(error => {
            //     dispatch(asyncOrderActions.getOrdersFailed());
            // });
        // }
        return {
            type: actionTypes.INIT_GET_ORDERS,
            token: token,
            userId: userId
        }
    }
}