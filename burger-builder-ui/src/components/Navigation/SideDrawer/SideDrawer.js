import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav><NavigationItems /></nav>
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;