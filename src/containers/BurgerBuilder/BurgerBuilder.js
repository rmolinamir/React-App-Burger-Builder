import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import { burgerBuilderCreators } from '../../store/actions/burgerBuilder';
import { contactDataCreators } from '../../store/actions/contactData';
import { authCreators } from '../../store/actions/auth';

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
        // axios.get('/ingredients.json')
        // .then( response => {
        //     this.setState({
        //         ingredients: response.data
        //     });
        // })
        // .catch(error => {
        //     this.setState({
        //         error: true
        //     })
        // });
        this.props.onInitialIngredientsHandler();
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
        return sum > 0;
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
        this.setState( prevState => {
            return {purchasing: !prevState.purchasing}
        });
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
        // this.props.history.replace('/checkout')
    }

    signInRedirect = () => {
        this.props.onSetAuthRedirectPath("/checkout");
        this.props.history.push({
            pathname: '/login'
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded.</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ingredients) {
            burger = (<>
                        <Burger ingredients={this.props.ingredients}/>
                        <BuildControls
                            isAuth={this.props.isAuthenticated}
                            ingredientAdded={this.props.onAddIngredientHandler}
                            ingredientRemoved={this.props.onRemoveIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.updatedPurchaseState(this.props.ingredients)}
                            purchasing={this.purchaseHandler}
                            signIn={this.signInRedirect}
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
        isAuthenticated: state.authReducer.token !== null,
        ingredients: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice,
        error: state.ingredientsReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitialIngredientsHandler: () => dispatch( burgerBuilderCreators.initialIngredientsHandler()),
        onAddIngredientHandler: (ingredientType) => dispatch( burgerBuilderCreators.addIngredientHandler(ingredientType)),
        onRemoveIngredientHandler: (ingredientType) => dispatch( burgerBuilderCreators.removeIngredientHandler(ingredientType) ),
        onInitPurchase: () => dispatch ( contactDataCreators.purchaseInit() ),
        onSetAuthRedirectPath: (path) => dispatch ( authCreators.setAuthRedirectPath(path) )
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);