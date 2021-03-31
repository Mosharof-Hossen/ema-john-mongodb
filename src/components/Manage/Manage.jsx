import React from 'react';
import fakeData from '../../fakeData';

const Manage = () => {
    const handleAddProduct = ()=>{
        fetch("http://localhost:5000/addProduct",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(fakeData)
        })
    }
    return (
        <div>
            <h1>Developer is Slipping</h1>
            <button onClick= {handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Manage;