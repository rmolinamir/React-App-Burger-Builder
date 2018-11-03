import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import { asyncBurgerBuilderActions } from '../actions/burgerBuilder';

export const burgerBuilderSagas = {
    initialIngredientsHandlerSaga: function* () {
        try {
            const response = yield axios.get('/ingredients.json');
            yield put(asyncBurgerBuilderActions.setIngredientsHandler(response.data));
        } catch (error) {
            yield put(asyncBurgerBuilderActions.setIngredientsFailed());
        }
    }
}