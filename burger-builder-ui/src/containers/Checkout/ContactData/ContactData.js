import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ContactData = (props) => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        }
    });

    const [loading, setLoading] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        setLoading(true);
        axios.post('/orders.json', {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customer: {
                name: 'Flo',
                email: 'flo@test.com',
                address: {
                    street: 'W Parker Rd',
                    postCode: '75000'
                }
            }
        }).then(response => {
            setLoading(false);
        }
        ).catch(error => {
            setLoading(false);
        });
    }

    let form = (
        <form>
            <input type="text" name="name" placeholder="Name" className={classes.Input} />
            <input type="email" name="email" placeholder="Email" className={classes.Input} />
            <input type="text" name="street" placeholder="Street" className={classes.Input} />
            <input type="text" name="postal" placeholder="Post Code" className={classes.Input} />
            <Button buttonType="Success" clicked={orderHandler}>Order</Button>
        </form>
    );
    if (loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    );
};

export default ContactData;