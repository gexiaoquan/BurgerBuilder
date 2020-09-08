import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.8,
    meat: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 5,
        purchased: false
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

    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.purchased} cancelPurchase={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
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
}

export default BurgerBuilder;