import React from 'react';
import { Link } from 'react-router-dom';
import "./Cart.css"

const Cart = (props) => {
    const cart = props.cart
    // const convertor = (num) => {num.toFixed(2)}
    const total = cart.reduce((total,prd)=>total + prd.price *prd.quantity,0)
    const shipping = cart.reduce((total,prd) => total+prd.shipping,0)
    const tax = total *(5/100)
    const atoz = (total + shipping  +tax).toFixed(2)
    
    return (
        <div className = "cart-style">
            <h2>Order Summary</h2>
            <h4>Items ordered: {cart.length}</h4>
            <p><small>Item:{total}</small></p>
            
            <p><small>Shipping and Handling:    ${shipping}</small></p>
            <p><small>Total before tax:{(total + shipping).toFixed(2)}</small></p>
            <p><small>Estimated Tax:{tax.toFixed(2)}</small></p>
            <h3>Order Total:	${atoz}</h3>
            {
                props.children
            }
        </div>
    );
};

export default Cart;