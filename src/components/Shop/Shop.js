import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from "../Product/Product";
import './Shop.css';


const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10)
  const [cart, setCart] = useState([])

  useEffect(()=>{
    const savedCart = getDatabaseCart()
    const productKey = Object.keys(savedCart)
    const previousCart = productKey.map(existingKey => {
      const product = fakeData.find(item => item.key === existingKey)
      // console.log(existingKey, savedCart[existingKey])
      product.quantity = savedCart[existingKey]
      return product;
    })
    setCart(previousCart)
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