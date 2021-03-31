import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import thankYou from "../../images/giphy.gif"

const Review = () => {
    const [cart , setCart ] = useState([])
    const [orderPlaced ,setOrderPlaced] = useState(false)
    const history = useHistory()

    const handleProceedCheckout = () =>{
        history.push("/shipment")
    }

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)

        fetch("http://localhost:5000/productsByKeys",{
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body :JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data =>setCart(data))
        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find( pd => pd.key === key)
        //     product.quantity = savedCart[key]
        //     return product
        // })
        // setCart (cartProducts)
    },[])
    const handleRemoveProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    return (
        
        <div className = "shop-container">
        <div className="product-container">
            <div>
                
                {
                    cart.map(item =><ReviewItem key = {item.key} product = {item} removeProduct = {handleRemoveProduct }></ReviewItem>)
                }
                
                {
                    orderPlaced && <img src={thankYou} alt=""/>
                }
                
            </div>
        </div>

        <div className="cart-container">
            <Cart cart = {cart}>
                <button onClick ={handleProceedCheckout} className = "btn-add" >Proceed Checkout</button>
            </Cart>
        </div>
        
    </div>
    );
};

export default Review;