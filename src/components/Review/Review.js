import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
  const [cart,setCart] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const history = useHistory()

  const handleProceedCheckout = () =>{
   history.push("/shipment")
  }
  useEffect(() => {
    const savedData = getDatabaseCart()
    const productKeys = Object.keys(savedData)

    fetch("https://guarded-everglades-98451.herokuapp.com/productsByKeys",{
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
    // const databaseProduct = productKeys.map(key => {
    //   const product = fakeData.find(item => item.key === key)
    //   product.quantity = savedData[key]
    //   return product;
    // })
    // setCart(databaseProduct)
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
          <button className="add-to-cart" onClick={handleProceedCheckout}>Proceed Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;