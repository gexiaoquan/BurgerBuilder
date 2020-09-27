import React, { useState, useEffect } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const passedIngredients = {};
        for (let [ingredient, count] of query.entries()) {
            if (ingredient === 'totalPrice') {
                setTotalPrice(count);
            } else {
                passedIngredients[ingredient] = +count;
            }
        }
        setIngredients(passedIngredients);
    }, [])

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinueHandler} />
            <Route path={props.match.url + '/contact-data'} render={() =>
                <ContactData ingredients={ingredients} totalPrice={totalPrice} />}></Route>
        </div>
    );
}

export default Checkout;