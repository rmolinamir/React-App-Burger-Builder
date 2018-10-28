import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        purchasing: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const order = {
            ingredients: this.props.ingredients,
            // Recalculating price on server side is recommended to avoid theft
            price: +this.props.price.toFixed(2),
            customer: {
                name: 'Max',
                address: {
                    street: 'Teststreet 1',
                    zip: '43151',
                    country: 'USA',
                },
                email: 'test@test.tcom'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({
                purchasing: false,
                loading: false,
            });
            this.props.history.push('/');

        })
        .catch(error => {
            this.setState({
                purchasing: false,
                loading: false,
            });
        });
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name:" />
                <input className={classes.Input} type="text" name="email" placeholder="Email:" />
                <input className={classes.Input} type="text" name="street" placeholder="Street:" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code:" />
                <Button type="success" clicked={this.orderHandler}>Order</Button>
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

export default ContactData;