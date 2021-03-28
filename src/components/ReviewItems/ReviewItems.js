import React from 'react';

const ReviewItems = (props) => {
  const {name,quantity,key,price} = props.product
 
  return (
    <div style={{border: "1px solid gray",padding: "15px"}}>
        <h2 className="product-name">{name}</h2>
        <p>Quantity:{quantity}</p>
        <p>Price:${price}</p>
        <button onClick={()=>props.removeProduct(key)} className="add-to-cart">Remove Item</button>
    </div>
  );
};

export default ReviewItems;