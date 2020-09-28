import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/orders.json").then(
            response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                setOrders(fetchedOrders);
                setLoading(false);
            }
        ).catch(error => {
            setLoading(false);
        });
    }, []);

    let orderList = <Spinner />
    if (!loading) {
        orderList = orders.map(order => {
            return <Order key={order.id} ingredients={order.ingredients} totalPrice={order.price} />
        });
    }

    return (
        <div>
            {orderList}
        </div>
    );
};

export default withErrorHandler(Orders, axios);