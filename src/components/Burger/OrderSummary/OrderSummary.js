import React from 'react';

import Button from '../../UI/Button/Button.js'

const orderSummary = (props) => {
    let ingredientsSummary = null;
    if (props.ingredients) {
        ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={ {textTransform: "capitalize"} }>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        });
    }
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type='danger' clicked={props.purchasing}>CANCEL</Button>
            <Button type='success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </>
    );
};

export default orderSummary;

// import React, { Component } from 'react';

// import Button from '../../UI/Button/Button.js'

// class OrderSummary extends Component {
//     // 
//     // componentWillUpdate() {
//     //     console.log('[OrderSummary.js] componentWillUpdate');
//     // }


//     render () {
//         const ingredientsSummary = Object.keys(this.props.ingredients)
//             .map(igKey => {
//                 return (
//                     <li key={igKey}>
//                         <span style={ {textTransform: "capitalize"} }>{igKey}</span>: {this.props.ingredients[igKey]}
//                     </li>
//                 );
//             });
//         return (
//             <>
//                 <h3>Your Order</h3>
//                 <p>A delicious burger with the following ingredients:</p>
//                 <ul>
//                     {ingredientsSummary}
//                 </ul>
//                 <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
//                 <p>Continue to Checkout?</p>
//                 <Button type='danger' clicked={this.props.purchasing}>CANCEL</Button>
//                 <Button type='success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
//             </>
//         );
//     }
// };

// export default OrderSummary;