import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + "contact-data")
    }

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    render() {
        return (
            <>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + "/contact-data"} 
                    // component={ContactData} />
                    render={(props) => (<ContactData {...props} ingredients={this.props.ingredients} price={this.props.totalPrice} />) } />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);
