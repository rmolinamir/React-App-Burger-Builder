import React from 'react';

import classes from './NavigationItems.module.css'

import NavigationItem from './NagivationItem/NagivationItem.js';

const nagivationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active>Burger Builder</NavigationItem>
            <NavigationItem link='/'>Checkout</NavigationItem>
        </ul>
    )
}

export default nagivationItems;