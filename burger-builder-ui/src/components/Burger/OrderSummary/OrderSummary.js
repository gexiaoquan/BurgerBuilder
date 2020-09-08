import React from 'react';

const orderSummary = (props) => {
    const ingredientItems = Object.keys(props.ingredients).map(
        type =>
            <li key={type}>
                <span style={{ textTransform: 'capitalize' }}>{type}</span> : {props.ingredients[type]}
            </li>
    );

    return (
        <React.Fragment>
            <h3>Your Order Summary</h3>
            <p>Ingredients:</p>
            <ul>{ingredientItems}</ul>
        </React.Fragment>
    )
}

export default orderSummary;