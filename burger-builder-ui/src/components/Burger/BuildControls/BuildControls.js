import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
];

const buildControls = (props) => {
    return <div className={classes.BuildControls}>
        <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(
            control => {
                return <BuildControl
                    key={control.type}
                    label={control.label}
                    addClick={() => props.addClick(control.type)}
                    removeClick={() => props.removeClick(control.type)}
                    removeDisabled={props.removeDisabled.includes(control.type)}
                />
            }
        )}
        <button
            className={classes.OrderButton}
            disabled={props.orderDisabled}
            onClick={props.ordered}
        >ORDER NOW</button>
    </div>
};

export default buildControls;