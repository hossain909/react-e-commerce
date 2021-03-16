import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
const Product = (props) => {
  const { img, name, seller, price, stock ,key} = props.product;
  const {showAddToCart} =  props
  // console.log(showAddToCart)
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="img"></img>
      </div>
      <div>
        <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
        <p><small>by: {seller}</small></p>
        <p>${price}</p>
        <p>Only {stock} left in stock - Order soon</p>
      
       {showAddToCart ? <button
        className="add-to-cart"
        onClick={() => props.handleAddToCart(props.product)}
      ><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button> : null}
        
      </div>
    </div>
  );
};

export default Product;