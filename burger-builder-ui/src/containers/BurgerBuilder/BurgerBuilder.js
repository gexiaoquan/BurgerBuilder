import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.8,
    meat: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchased: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("/ingredients.json").then(
            response => this.setState({ ingredients: response.data })
        ).catch(error => this.setState({ error: true }));
    }

    addIngredientHandler = (igType) => {
        this.setState((preState) => {
            const igts = { ...preState.ingredients };
            igts[igType]++;
            return {
                ingredients: igts,
                totalPrice: preState.totalPrice + INGREDIENTS_PRICE[igType]
            };
        });
    }

    removeIngredientHandler = (igType) => {
        this.setState((preState) => {
            const igts = { ...preState.ingredients };
            if (igts[igType] <= 0) {
                return;
            }
            igts[igType]--;
            return {
                ingredients: igts,
                totalPrice: preState.totalPrice - INGREDIENTS_PRICE[igType]
            };
        });
    }

    evaluateDisabledRemoveButton = () => {
        return Object.keys(this.state.ingredients).filter(type => this.state.ingredients[type] <= 0);
    }

    evaluateDisabledOrderButton = () => {
        const sum = Object.keys(this.state.ingredients)
            .map(type => this.state.ingredients[type])
            .reduce((sum, el) => sum + el)
        return sum <= 0;
    }

    purchaseHandler = () => {
        this.setState({ purchased: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchased: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        axios.post('/orders.json', {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Flo',
                email: 'flo@test.com'
            }
        }).then(response => {
            this.setState({
                loading: false,
                purchased: false
            });
        }
        ).catch(error => {
            this.setState({
                loading: false,
                purchased: false
            });
        });
    }

    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p>ingredient can't be displayed</p> : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice.toFixed(2)}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;

            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addClick={this.addIngredientHandler}
                        removeClick={this.removeIngredientHandler}
                        removeDisabled={this.evaluateDisabledRemoveButton()}
                        orderDisabled={this.evaluateDisabledOrderButton()}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchased} cancelPurchase={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);