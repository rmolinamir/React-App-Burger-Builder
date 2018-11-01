import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + "/contact-data")
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
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            // const purchaseRedirect = !this.props.purchasing ? <Redirect to="/" /> : null;
            summary = (
                <>  
                    {/* {purchaseRedirect} */}
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData} />
                </>
            )
        }
        return (
            summary
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice,
        purchasing: state.contactDataReducer.purchasing
    }
}

export default withRouter(connect(mapStateToProps)(Checkout));
