import React from 'react';

import classes from './Order.module.css'

const order = (props) => {
    const ingredients = [];
    Object.entries(props.ingredients).map( ingredient => {
        return ingredients.push(<span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '8px'
            }} 
            key={ingredient[0]}> 
                {ingredient[0]} ({ingredient[1]}) 
            </span>);
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Total Price: <strong>${Number(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;