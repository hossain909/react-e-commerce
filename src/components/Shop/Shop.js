import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10)
  const [cart, setCart] = useState([])

  const handleAddToCart = (product) => {
    const newCart = [...cart, product]
    setCart(newCart);
  }
  return (
    <div className="shop-container">
      <div className="product-container">
        {
          products.map(item =>
            <Product
              handleAddToCart={handleAddToCart}
              product={item}
            ></Product>)
        }
      </div>
      <div className="cart-contaniner">
        <Cart cart={cart}></Cart>
      </div>
      <ul>
      </ul>
    </div>
  );
};

export default Shop; <h3>This is Shop</h3>