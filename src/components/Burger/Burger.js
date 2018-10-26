import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js'


const burger = ( props ) => {

    // Transforming Object into Array for Render
    let transformedIngredients = null;
    if (props.ingredients) {
        transformedIngredients = Object.keys(props.ingredients)
            // Map each Key of the props.ingredients Object
            .map(igKey => {
                // We return an empty array of every Key and for every Key then we map again to 
                // return the JSX BurgerIngredients Array with Type and Key props
                return [...Array(props.ingredients[igKey])].map( (_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />;
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []);
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;