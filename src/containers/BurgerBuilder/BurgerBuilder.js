import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

import * as actionTypes from '../../store/actions';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7,
// }

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }

    componentDidMount () {
        axios.get('/ingredients.json')
        .then( response => {
            this.setState(
                {ingredients: response.data
            });
        })
        .catch(error => {
            this.setState({
                error: true
            })
        });
    }

    componentDidUpdate(prevProps) {
        if ( this.props.ingredients !== prevProps.ingredients) {
            this.updatedPurchaseState(this.props.ingredients);
        }
    }

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0,
        // },
        // ingredients: null,
        // totalPrice: 5.7,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null,
    }

    updatedPurchaseState = (ingredients) => {
        // const sum = Object.keys(ingredients)
        //     .map(igKey => {
        //         return ingredients[igKey];
        //     })
        //     .reduce((sum, el) => {
        //         return sum + el;
        //     }, 0);
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0,
        });
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice + priceAddition;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice,
    //     });
    //     this.updatedPurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice - priceAddition;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice,
    //     });
    //     this.updatedPurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        const purchasingBool = !this.state.purchasing;
        this.setState({
            purchasing: purchasingBool
        });
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout/',
            // search: '?' + queryString
        });
        // this.props.history.replace('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded.</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ingredients) {
            burger = (<>
                        <Burger ingredients={this.props.ingredients}/>
                        <BuildControls 
                            ingredientAdded={this.props.onAddIngredientHandler}
                            ingredientRemoved={this.props.onRemoveIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            purchasing={this.purchaseHandler}
                            price = {this.props.totalPrice}
                        />
                    </>);
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchasing={this.purchaseHandler}
                purchaseContinue={this.purchaseContinueHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <>  
                <Modal 
                    show={this.state.purchasing}
                    purchasing={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
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

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredientHandler: (ingredientType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType: ingredientType}),
        onRemoveIngredientHandler: (ingredientType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType})
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);