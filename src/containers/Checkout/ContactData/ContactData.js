import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

import { contactDataCreators } from '../../../store/actions/contactData';

import { checkValidity } from '../../../shared/utility';

class ContactData extends PureComponent {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name:'
                },
                value: '',
                valueType: 'Name',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street:'
                },
                value: '',
                valueType: 'Address',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code:'
                },
                value: '',
                valueType: 'ZIP Code',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country:'
                },
                value: '',
                valueType: 'Country',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
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
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    type: 'Delivery Method',
                    options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                },
                valid: true,
                value: 'fastest',
                validation: {}
            },
        },
        formIsValid: false,
        purchasing: false,
        // loading: false
    }

    // checkValidity = (value, rules) => {
    //     let isValid = true;
    //     if (rules) {
    //         if (rules.required) {
    //             isValid = value.trim() !== '' && isValid;
    //         }

    //         if (rules.minLength) {
    //             isValid = value.length >= rules.minLength && isValid;
    //         }

    //         if (rules.maxLength) {
    //             isValid = value.length <= rules.maxLength && isValid;
    //         }

    //         if (rules.email) {
    //             isValid = value.includes('@') && value.includes('.') && isValid;
    //         }
    //     }
    //     return isValid;
    // }
    
    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
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
            orderForm: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({
        //     loading: true,
        // });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            // Recalculating price on server side is recommended to avoid theft
            price: Number(this.props.totalPrice).toFixed(2),
            orderData: formData,
            userId: this.props.userId

        }
        this.props.purchaseOrderHandler(order, this.props.token);
        this.props.history.push('/');
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({
        //         purchasing: false,
        //         loading: false,
        //     });
        //     this.props.history.push('/');

        // })
        // .catch(error => {
        //     this.setState({
        //         purchasing: false,
        //         loading: false,
        //     });
        // });
    }

    render () {
        const formElementsArray = Object.entries(this.state.orderForm);
        let form = (
            <form onSubmit={this.orderHandler}>
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
                <Button disabled={!this.state.formIsValid} type="success">Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice,
        loading: state.contactDataReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseOrderHandler: (order, token) => dispatch( contactDataCreators.purchaseOrderHandler(order, token)  ) 
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(ContactData), axios);