import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from "../../fakeData"
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"

const Shop = () => {

    const [products , setProducts] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    const [cart , setCart ] = useState([])



    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        console.log(products,productKeys)
        if(products.length){
            const cartProducts = productKeys.map(key => {
                const product = products.find( pd => pd.key === key)
                product.quantity = savedCart[key]
                return product
            })
            setCart (cartProducts)
        }
        
    },[products])

    const handelAddProduct = (product) =>{
        const toBeAddedKey = product.key
        const someProduct = cart.find(pd=>pd.key === toBeAddedKey)
        let count = 1
        let newCart;
        if(someProduct){
            count = someProduct.quantity + 1
            someProduct.quantity = count
            const other = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...other , someProduct]
        }
        else{
            product.quantity = 1
            newCart = [...cart , product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key,count )
    }
    
    return (
        <div className = "shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddToCart = {true}  handelAddProduct = {handelAddProduct} product = {product}></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart reviewBtn = {true} cart = {cart}>
                    <Link to = "/review" ><button className = "btn-add" > Review Order</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;