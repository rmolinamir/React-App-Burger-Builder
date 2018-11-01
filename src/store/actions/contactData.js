import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const asyncPurchaseActions = {
    successPurchaseOrderHandler: (id, orderData) => {
        return {
            type: actionTypes.PURCHASE_ORDER_SUCCESS,
            orderId: id,
            orderData: orderData
        }
    },
    failedPurchaseOrderHandler: (error) => {
        return {
            type: actionTypes.PURCHASE_ORDER_FAIL,
            error: error
        }
    },
    resetIngredients: () => {
        return {
            type: actionTypes.RESET_INGREDIENTS
        }
    },
}

export const contactDataCreators = {
    purchaseInit: () => {
        return {
            type:actionTypes.PURCHASE_INIT
        }
    },
    purchaseOrderStart: () => {
        return {
            type: actionTypes.PURCHASE_ORDER_START
        }
    },
    purchaseOrderHandler: (order, token) => {
        return dispatch => {
            dispatch( contactDataCreators.purchaseOrderStart() );
            axios.post('/orders.json?auth=' + token, order)
            .then( response => {
                dispatch(asyncPurchaseActions.resetIngredients());
                dispatch(asyncPurchaseActions.successPurchaseOrderHandler(response.data.name, order));
            })
            .catch(error => {
                dispatch(asyncPurchaseActions.failedPurchaseOrderHandler(error));
            });
        }
    }
}