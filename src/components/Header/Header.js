import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInuser] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo} alt="Logo"></img>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Inventory</Link>
                <button onClick= {()=>setLoggedInuser({})}>Sign Out</button>
            </nav>
        </div>
    );
};
// 90a4ae
export default Header;