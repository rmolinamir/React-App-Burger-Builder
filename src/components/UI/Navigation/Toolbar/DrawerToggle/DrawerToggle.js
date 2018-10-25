import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    const drawerToggleClasses = [];
    drawerToggleClasses.push(props.drawerClass);
    drawerToggleClasses.push(classes.DrawerToggle);

    return (
        <div 
            className={drawerToggleClasses.join(' ')}
            onClick={props.click}>
                <div></div>
                <div></div>
                <div></div>
        </div>
    );
}

export default drawerToggle;