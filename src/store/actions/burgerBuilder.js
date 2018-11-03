import * as actionTypes from './actionTypes';

// import axios from '../../axios-orders';

export const asyncBurgerBuilderActions = {
    setIngredientsHandler: (initialIngredients) => {
        return {
            type: actionTypes.INITIAL_INGREDIENTS,
            initialIngredients: initialIngredients
        }
    },
    setIngredientsFailed: () => {
        return {
            type: actionTypes.INITIAL_INGREDIENTS_FAILED,
        }
    }
}

export const burgerBuilderCreators = {
    initialIngredientsHandler: () => {
        // return dispatch => {
        //     axios.get('/ingredients.json')
        //     .then( response => {
        //         dispatch(asyncBurgerBuilderActions.setIngredientsHandler(response.data));
        //     })
        //     .catch(error => {
        //         dispatch(asyncBurgerBuilderActions.setIngredientsFailed());
        //     });
        // }
        return {
            type: actionTypes.GET_INITIAL_INGREDIENTS
        }
    },
    addIngredientHandler: (ingredientType) => {
        return {
            type: actionTypes.ADD_INGREDIENT,
            ingredientType: ingredientType
        }
    },
    removeIngredientHandler: (ingredientType) => {
        return {
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientType: ingredientType
        }
    },
    resetIngredientsHandler: () => {
        return {
            type: actionTypes.RESET_INGREDIENTS
        }
    }
}