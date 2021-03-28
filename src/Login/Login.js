import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../App";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLogInFramwork, signInWithEmailAndPassword } from './LogInManager';


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false
  })

  initializeLogInFramwork()

  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res)
      setLoggedInUser(res)
      history.replace(from);
    })
  }
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res,true)
    })
  }
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res,false)
    })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res)
    setLoggedInUser(res)
    if(redirect) {
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const hasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && hasNumber
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    e.preventDefault()
  }

  
  
  return (
    <div style={{textAlign: "center"}}>
      { user.isSignedIn
        ? <button onClick={signOut}>Sign Out</button>
        : <button onClick={googleSignIn}>Sign In</button>
      }<br />
      <button onClick={fbSignIn}>Facebook Log in</button>

      {
        user.isSignedIn &&
        <div>
          <h3>Welcome {user.name}</h3>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our own Athentication </h1>
      <form onSubmit={handleSubmit}>
        <input onChange={() => setNewUser(!newUser)} type="checkbox" />
        <label htmlFor="newUser">New user Sign Up</label><br />
        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your name" />}<br />
        <input onBlur={handleBlur} type="email" name="email" placeholder="Email" required /><br />
        <input onBlur={handleBlur} type="password" name="password" placeholder="Password" required
        /><br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>

      { user.success
        ? <h2 style={{ color: "green" }}>User {newUser ? "Created" : "Logged In"} successfully</h2>
        : <h2 style={{ color: "red" }}>{user.error}</h2>
      }
    </div>
  );
}
export default Login;
