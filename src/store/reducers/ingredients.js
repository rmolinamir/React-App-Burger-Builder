import * as actionTypes from '../actions/actionTypes';

import { updateObject } from './updateObject';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const initialState = {
    ingredients: null,
    totalPrice: null,
    error: false
}

let initialStateBoolean = false;

const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INITIAL_INGREDIENTS_FAILED:
        return updateObject(state, {error: true});
        case actionTypes.INITIAL_INGREDIENTS:
            if (initialStateBoolean) {
                break;
            }
            initialStateBoolean = true;
            let initialPrice = 4;
            for (let ingredientType in action.initialIngredients) {
                initialPrice = initialPrice + action.initialIngredients[ingredientType]*INGREDIENT_PRICES[ingredientType];
            }
            return updateObject(state, {
                ingredients: {
                    salad: action.initialIngredients.salad,
                    bacon: action.initialIngredients.bacon,
                    cheese: action.initialIngredients.cheese,
                    meat: action.initialIngredients.meat
                },
                totalPrice: initialPrice, error: false});
        case actionTypes.ADD_INGREDIENT:
            return updateObject(state, {ingredients: { ...state.ingredients, [action.ingredientType]: state.ingredients[action.ingredientType] + 1}, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],});
        case actionTypes.REMOVE_INGREDIENT:
            return updateObject(state, {ingredients: { ...state.ingredients, [action.ingredientType]: state.ingredients[action.ingredientType] - 1}, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],});
        default:
            // do nothing
    }
    return state;
}

export default ingredientsReducer;