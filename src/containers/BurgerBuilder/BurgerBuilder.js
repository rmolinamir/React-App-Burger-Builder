import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';

import axios from '../../axios-orders.js';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

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

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0,
        // },
        ingredients: null,
        totalPrice: 4,
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
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.updatedPurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.updatedPurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        const purchasingBool = !this.state.purchasing;
        this.setState({
            purchasing: purchasingBool}
        );
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true,
        });
        // alert('You continue!');
        const order = {
            ingredients: this.state.ingredients,
            // Recalculating price on server side is recommended to avoid theft
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'Teststreet 1',
                    zip: '43151',
                    country: 'USA',
                },
                email: 'test@test.tcom'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({
                purchasing: false,
                loading: false,
            });
        })
        .catch(error => {
            this.setState({
                purchasing: false,
                loading: false,
            });
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded.</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.ingredients) {
            burger = (<>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            purchasing={this.purchaseHandler}
                            price = {this.state.totalPrice}
                        />
                    </>);
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);