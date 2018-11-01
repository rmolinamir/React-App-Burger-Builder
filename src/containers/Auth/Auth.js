import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import { authCreators } from '../../store/actions/auth';

import { checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email:'
                },
                value: '',
                valueType: 'Email',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password:'
                },
                value: '',
                valueType: 'Password',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: false,
        formIsValid: false,
        purchasing: false,
    }

    componentDidMount () {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }

            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }

            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid;
            }

            if (rules.email) {
                isValid = value.includes('@') && value.includes('.') && isValid;
            }
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render () {
        const formElementsArray = Object.entries(this.state.controls);
        let form = <Spinner />
        if (!this.props.loading) {
            form = (
                <>
                    <form onSubmit={this.onSubmitHandler}>
                        {formElementsArray.map( input => {
                            return <Input 
                                key={input[0]} 
                                elementType={input[1].elementType} 
                                elementConfig={input[1].elementConfig} 
                                changed={(event) => this.inputChangeHandler(event, input[0])}
                                invalid={!input[1].valid}
                                shouldValidate={input[1].validation}
                                touched={input[1].touched}
                                value={input[1].value} 
                                valueType={input[1].valueType} />;
                        })}
                        <Button disabled={!this.state.formIsValid} type="success">SUBMIT</Button>
                    </form>
                    <div>
                        <p>{this.state.isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                        <Button 
                            type="danger" 
                            clicked={this.switchAuthModeHandler}>{this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
                    </div>
                </>
            );
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <div>
                    <p>{this.props.error}</p>
                </div>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                <h1>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        authRedirectPath: state.authReducer.authRedirectPath,
        buildingBurger: state.ingredientsReducer.buildingBurger
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authCreators.authHandler(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch( authCreators.setAuthRedirectPath("/") )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);