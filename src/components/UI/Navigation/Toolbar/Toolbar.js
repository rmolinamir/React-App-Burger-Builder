import React from 'react';

import classes from './Toolbar.module.css';

import Logo from '../../../Logo/Logo.js';
import NagivationItems from '../NavigationItems/NavigationItems.js';
import DrawerToggle from './DrawerToggle/DrawerToggle.js';


const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle 
                drawerClass={classes.MobileOnly}
                click={props.sideDrawerToggleClick}/>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NagivationItems />
            </nav>
        </header>
    )
}

export default toolbar;