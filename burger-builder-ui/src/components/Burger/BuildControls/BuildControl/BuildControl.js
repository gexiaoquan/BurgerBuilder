import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.removeClick} disabled={props.removeDisabled}>Remove</button>
            <button className={classes.More} onClick={props.addClick}>Add</button>
        </div>
    );
};

export default buildControl;