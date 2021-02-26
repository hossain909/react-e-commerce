import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Product = (props) => {
  const { img, name, seller, price, stock } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="img"></img>
      </div>
      <div>
        <h4 className="product-name">{name}</h4>
        <p><small>by: {seller}</small></p>
        <p>${price}</p>
        <p>Only {stock} left in stock - Order soon</p>
        <button
          className="add-to-cart"
          onClick={() => props.handleAddToCart(props.product)}
        ><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
      </div>
    </div>
  );
};

export default Product;