import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/UI/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import { ordersCreators } from '../../store/actions/orders';

class Orders extends Component {
    state = {
        loading: true,
    }
    componentWillReceiveProps () {
        if (this.props.orders) {
            this.setState({loading: false});
        }
    }
    componentDidMount () {
        this.props.getOrdersHandler();
    }

    render() {
        let orders;
        orders = <Spinner />;
        if (!this.state.loading) {
            orders = Object.entries(this.props.orders).map( (order) => {
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

const mapStateToProps = (state) => {
    return {
        orders: state.ordersReducer.orders,
        error: state.ordersReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrdersHandler: () => dispatch( ordersCreators.getOrdersHandler() )
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(Orders), axios);