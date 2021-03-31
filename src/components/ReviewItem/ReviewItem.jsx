import React from 'react';

const ReviewItem = (props) => {
    const {name ,quantity ,price} = props.product
    return (
        <div>
            <h4>product name:{name}</h4>
            <p>Quantity:{quantity}</p>
            <p>price: ${price}</p>
            <button onClick={() =>props.removeProduct(props.product.key)} className = "btn-add"> Remove</button>
        </div>
    );
};

export default ReviewItem;