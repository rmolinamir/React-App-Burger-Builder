import * as actionTypes from '../actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 1,
        meat: 1,
    },
    totalPrice: 5.7,
}

const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            const oldCount = state.ingredients[action.ingredientType];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                ...state.ingredients
            };
            updatedIngredients[action.ingredientType] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[action.ingredientType];
            const oldPrice = state.totalPrice;
            const updatedPrice = oldPrice + priceAddition;
            return {
                ingredients: updatedIngredients,
                totalPrice: updatedPrice,
            }
        case actionTypes.REMOVE_INGREDIENT:
            const oldRemovedCount = state.ingredients[action.ingredientType];
            const updatedRemovedCount = oldRemovedCount - 1;
            const updatedRemovedIngredients = {
                ...state.ingredients
            };
            updatedRemovedIngredients[action.ingredientType] = updatedRemovedCount;
            const priceRemovedAddition = INGREDIENT_PRICES[action.ingredientType];
            const oldRemovedPrice = state.totalPrice;
            const updatedRemovedPrice = oldRemovedPrice - priceRemovedAddition;
            return {
                ingredients: updatedRemovedIngredients,
                totalPrice: updatedRemovedPrice,
            }
        default:
            // do nothing
    }
    return state;
}

export default ingredientsReducer;