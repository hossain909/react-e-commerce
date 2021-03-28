import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../App';
import { getDatabaseCart, processOrder } from '../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm()
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
   const onSubmit = data => {
    const savedCart = getDatabaseCart()
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderPlaced: new Date()}
     fetch("https://guarded-everglades-98451.herokuapp.com/addOrder",{
       method: "POST",
       headers: {
         'Content-type': 'application/json; charset=UTF-8',
       },
       body: JSON.stringify(orderDetails)
     })
     .then(res => res.json())
     .then(data => {
       if(data){
         processOrder()
         alert("Your order placed successfully!")
       }
     })
  }

  return (
      <form className="ship-form" onSubmit = { handleSubmit(onSubmit) } >
        <input name="name" defaultValue ={loggedInUser.name} ref = { register({ required: true }) } placeholder="Name"/>
        {errors.name && <span className="error">Name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} ref = { register({ required: true }) } placeholder="Email"/>
        {errors.eamil && <span className="error">Email is required</span>}
        <input name = "address" ref = { register({ required: true }) } placeholder="Address"/>
        {errors.address && <span className="error">Address is required</span>}
        <input name = "phone" ref = { register({ required: true }) } placeholder="Phone"/>
        {errors.phone && <span className="error">Phone is required</span> }
        <input type="submit" />
      </form>

  );
};

export default Shipment;