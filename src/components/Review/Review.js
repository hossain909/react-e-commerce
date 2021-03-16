import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
  const [cart,setCart] = useState([])

  const handlePlaceOrder = () =>{
    setCart([])
    processOrder()
  }
  useEffect(() => {
    // Cart
    const savedData = getDatabaseCart()
    const productKey = Object.keys(savedData)
    const databaseProduct = productKey.map(key => {
      const product = fakeData.find(item => item.key === key)
      product.quantity = savedData[key]
      return product;
    })
    setCart(databaseProduct)
  },[])
   const removeProduct = (key) =>{
    //  console.log("Remove Clicked",key)
     const newCart = cart.filter(item => item.key !== key)
     setCart(newCart)
     removeFromDatabaseCart(key)
   } 
  return (
    <div style={{display:"flex"}}>
      <div className="product-container">
          <h2>Cart Items: {cart.length}</h2>
          {cart.map(item =>  <ReviewItems  
          product={item}
          removeProduct={removeProduct}
          ></ReviewItems>)}
      </div>
      <div className="review-cart">
        <Cart 
        cart={cart}>
          <button className="add-to-cart" onClick={handlePlaceOrder}>Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;