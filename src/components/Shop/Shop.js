import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from "../Product/Product";
import './Shop.css';


const Shop = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(()=>{
    fetch("https://guarded-everglades-98451.herokuapp.com/products")
    .then(res => res.json())
    .then(data => setProducts(data))
  },[])

  useEffect(()=>{
    const savedCart = getDatabaseCart()
    const productKeys = Object.keys(savedCart)
    fetch("https://guarded-everglades-98451.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(productKeys)
    })
      .then(res => res.json())
      .then(data => setCart(data))
  },[])

  const handleAddToCart = (product) => {
    const sameProduct = cart.find(item => item.key === product.key)
    let count = 1;
    let newCart;
    if(sameProduct){
      const count = sameProduct.quantity + 1
      sameProduct.quantity = count;
      const others = cart.filter(item => item.key !== product.key)
      newCart = [...others,sameProduct]
    }
    else{
      product.quantity = 1;
      newCart = [...cart,product]
    }
    // add product to database
    setCart(newCart)
    addToDatabaseCart(product.key, count)

  }
  return (
    <div className="shop-container">
      <div className="product-container">
        {
          products.map(product =>
            <Product
              key={product.key}
              handleAddToCart={handleAddToCart}
              product={product}
              showAddToCart={true}
            ></Product>)
            }
      </div>
      <div className="cart-contaniner">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="add-to-cart">Order Review</button>
          </Link>
        </Cart>
      </div>
      <ul>
      </ul>
    </div>
  );
};

export default Shop; <h3>This is Shop</h3>