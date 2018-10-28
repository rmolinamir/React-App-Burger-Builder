import React from 'react';

import Burger from '../../../Burger/Burger';
import Button from '../../../UI/Button/Button'

import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you enjoy it!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                type='danger'
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button 
                type='success'
                clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;