import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../../components/UI/Spinner/Spinner';

import { asyncAuthActions } from '../../../store/actions/auth';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render () {
        return (
            <>
                <Spinner />
                <Redirect to="/" />
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(asyncAuthActions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);