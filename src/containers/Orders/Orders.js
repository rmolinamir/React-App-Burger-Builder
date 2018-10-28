import React, { Component } from 'react';

import Order from '../../components/UI/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount () {
        axios.get('/orders.json')
        .then( res => {
            this.setState({
                orders: res.data,
                loading: false
            });
        })
        .catch( err => {
            this.setState({loading: false})
        });
    }

    render() {
        let orders;
        orders = <Spinner />;
        if (!this.state.loading) {
            orders = [];
            orders = Object.entries(this.state.orders).map( (order) => {
                let orderId = order[0];
                let orderProps = order[1];
                return (
                    <Order key={orderId} price={orderProps.price} ingredients={orderProps.ingredients} />
                );
            });
        }
        return (
            <>
                {orders}
            </>
        );
    }
}

export default withErrorHandler(Orders, axios);