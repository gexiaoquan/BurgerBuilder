import React, { useState } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { withRouter } from 'react-router-dom';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const logoClickedHandler = () => {
        props.history.push('/');
    }
    
    return (
        <React.Fragment>
            <Toolbar menuClicked={() => setShowSideDrawer(!showSideDrawer)} logoClicked={logoClickedHandler} />
            <SideDrawer show={showSideDrawer} closed={() => setShowSideDrawer(false)} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default withRouter(Layout);