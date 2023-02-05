import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
 
  const navigator = useNavigate();
  const [signinData, setSigninData] = useState({ username: "", password: "" });
  const onSignin = (e) => {
    e.preventDefault();
    
    fetch("https://shoppingcart-7a48.onrender.com/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signinData.username,
        password: signinData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.message) {
          return alert(data.message);
        }

        window.localStorage.setItem("id", data.user._id);
        window.localStorage.setItem("username", data.user.username);
      
        alert(`user signin successfully`);
        

      });
  };
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("username")) {
      navigator("/home");
    }else{
      navigator("/");
    }
  }, [localStorage.getItem("id")]);
  // useEffect(() => {
  //   if (!localStorage.getItem("id") && !localStorage.getItem("username")) {
  //     navigator("/");
  //   }
  // }, []);
  
  
  return (
    <>
      <div className="login-main">
        <div className="login-box">
          <div className="login-logo">shopping cart</div>
          <div className="login-para">
            Enter your credentials to access your account
          </div>
          <form className="login-form">
            <input
              className="login-input"
              type="username"
              placeholder="User ID"
              name="username"
              required
              onChange={(e) => {
                setSigninData({ ...signinData, username: e.target.value });
              }}
            />

            <input
              className="login-input"
              type=  "password"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => {
                setSigninData({ ...signinData, password: e.target.value });
              }}
            />
            

            <button className="login-btn" onClick={onSignin} type="submit">
              Sign In
            </button>
          </form>
          <div id="login-a">
            <Link to={"/register"}>Sign up</Link>
          </div>
        </div>
        <div className="addition">
          <p>Don't have an account?</p>
          <Link to={"/register"}>Sign up</Link>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Login;
