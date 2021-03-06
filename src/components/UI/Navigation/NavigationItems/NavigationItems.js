import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NagivationItem/NagivationItem.js';

const nagivationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/github' exact>Github Profile</NavigationItem>
            <NavigationItem link='/linkedin' exact>LinkedIn Profile</NavigationItem>
            <NavigationItem link='/rmolinamir' exact>Robert Molina</NavigationItem>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            {props.isAuthenticated ? 
                <NavigationItem link='/orders'>Orders</NavigationItem> : 
                null
            }
            {props.isAuthenticated ? 
                <NavigationItem link='/logout'>Sign Out</NavigationItem> : 
                <NavigationItem link='/login'>Sign In</NavigationItem>
            }
        </ul>
    )
}

export default nagivationItems;