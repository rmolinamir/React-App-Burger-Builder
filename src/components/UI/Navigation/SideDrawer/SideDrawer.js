import React from 'react';

import classes from './SideDrawer.module.css';

import Backdrop from '../../Backdrop/Backdrop.js'
import Logo from '../../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js';



const sideDrawer = (props) => {
    // ...
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>  
            <Backdrop 
                show={props.show} 
                clicked={props.click}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;