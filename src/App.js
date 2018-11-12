import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCreators } from './store/actions/auth';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

// import classes from './App.module.css';

class App extends Component {

  componentDidMount () {
    this.props.onAuthCheckState();
  }

  render() {
    const redirects = (
      <>
        <Route exact path="/github" component={() => window.location = 'https://github.com/rmolinamir'} />
        <Route exact path="/linkedin" component={() => window.location = 'https://www.linkedin.com/in/rmolinamir'} />
        <Route exact path="/rmolinamir" component={() => window.location = 'https://robertmolinamir.firebaseapp.com'} />
      </>
    )
    const errorPage = (
      <h1 
      style={
        {
          display: 'flex', 
          alignItems: 'center', 
          height: '75vh', 
          width: '70vw', 
          textAlign: 'center', 
          margin: 'auto'}}>Error 404 Not Found. The client was able to communicate with the server, but the server could not find what was requested.</h1>
    );
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            {redirects}
            {/* <Route path="/login" component={Auth}/> */}
            <Route path="/login" render={() => <Suspense fallback={<Spinner />}><Auth /></Suspense>}/>
            <Route path="/logout" component={Logout}/>
            {/* <Route path="/checkout" component={Checkout}/> */}
            <Route path="/checkout" render={() => <Suspense fallback={<Spinner />}><Checkout /></Suspense>}/>
            <Route path="/orders" render={() => <Suspense fallback={<Spinner />}><Orders /></Suspense>}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route render={() => errorPage}/>
          </Switch>
        )
    } else {
      routes = (
        <Switch>
          {redirects}
          <Route path="/login" render={() => <Suspense fallback={<Spinner />}><Auth /></Suspense>}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route render={() => errorPage}/>
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(authCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
