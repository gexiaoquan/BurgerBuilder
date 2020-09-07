import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 5
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

    evaluateDisabledButton = () => {
        return Object.keys(this.state.ingredients).filter(type => this.state.ingredients[type] <= 0);
    }

    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addClick={this.addIngredientHandler}
                    removeClick={this.removeIngredientHandler}
                    removeDisabled={this.evaluateDisabledButton()}
                    price={this.state.totalPrice}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;