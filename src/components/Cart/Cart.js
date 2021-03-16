import React from 'react';

const Cart = (props) => {
  // console.log(props)
  const cart = props.cart
  // const totalPrice = cart.reduce((total, product) => total + product.price, 0)
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i]
    // console.log(product)
    totalPrice += product.price * product.quantity
  }
  let shipping = 0;
  if (totalPrice > 35) {
    shipping = 0
  }
  else if (totalPrice > 15) {
    shipping = 4.99
  }
  else if (totalPrice > 0) {
    shipping = 12.99
  }
  const tax = Math.round(totalPrice / 10)
  const grandTotal = Math.round(totalPrice + shipping + tax)

  const formatNumber = (num) => {
    const precision = num.toFixed(2)
    return Number(precision)
  }
  return (
    <div>
      <h2>Order Summary</h2>
      <h3>Items Ordered:{cart.length}</h3>
      <h3>Product Price: {formatNumber(totalPrice)}</h3>
      <h4><small>Shipping Cost:{shipping}</small></h4>
      <h4><small>Tax + Vat:{tax}</small></h4>
      <h3>Total Price:{grandTotal}</h3>
      {
        props.children
      }
    </div>
  );
};

export default Cart;