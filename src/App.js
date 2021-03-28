import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Inventory from "./components/Inventory/Inventory";
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Shipment from './Shipment/Shipment';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser] }>
      <h3>Email: {loggedInUser.email}</h3>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop> 
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
