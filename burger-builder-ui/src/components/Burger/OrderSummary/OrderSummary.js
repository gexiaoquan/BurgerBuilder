import React from 'react';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
    )
}

export default orderSummary;