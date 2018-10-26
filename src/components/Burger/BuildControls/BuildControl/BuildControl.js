import React from 'react';

import classes from './BuildControl.module.css'

const buildControl = (props) => {
    let disabled = true;
    if (!props.disabled) {
        disabled = props.disabled;
    }
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                className={classes.Less} 
                onClick={props.removed} 
                disabled={disabled}>Less</button>
            <button 
                className={classes.More} 
                onClick={props.added}>More</button>
        </div>
    );
}


export default buildControl;