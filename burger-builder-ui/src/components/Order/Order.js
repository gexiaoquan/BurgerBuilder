import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: {Object.keys(props.ingredients).map(
                ig =>
                    <span
                        key={ig}
                        style={{
                            textTransform: 'capitalize',
                            display: 'inline-block',
                            margin: '0 8px',
                            border: '1px solid #ccc',
                            padding: '5px'
                        }}>{ig} ({props.ingredients[ig]}) </span>
            )}</p>
            <p>Price: <strong>USD {parseFloat(props.totalPrice).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;