import React, { Component } from 'react';
import classes from './Layout.module.css';

import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar.js'
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer.js'

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    // sideDrawerClosedHandler = () => {
    //     const showSideDrawerBool = !this.state.showSideDrawer;
    //     this.setState({
    //         showSideDrawer: showSideDrawerBool,
    //     })
    // }

    sideDrawerClosedHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer,};
        });
    }

    // HOC
    render () {
        return (
            <>
                <Toolbar
                    sideDrawerToggleClick={this.sideDrawerClosedHandler} />
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    click={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                {/* <footer className={classes.Footer}>
                    Footer
                </footer> */}
            </>
        )
    }
}

export default Layout;