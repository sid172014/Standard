// SignInSignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/login.css";

function SignInSignUp({userInfo,setUserInfo}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);


  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };
  
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Here you can access username and password state variables
    
    navigate('/kyc');
    console.log(username);
    console.log(password);
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    // Here you can access username, email, and password state variables
    setUserInfo((prev) => {
      const newObject = {...prev};
      newObject.username = username;
      newObject.password = password;
      newObject.email = email;
      console.log(newObject);
      return newObject;
    });
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
        <form action="#" className={`sign-in-form ${isSignUp ? "" : "hidden"}`} onSubmit={handleLoginSubmit}>
        <h2 className="title">Sign in</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Login" className="btn solid" />
      </form>
      <form action="#" className={`sign-up-form ${isSignUp ? "hidden" : ""}`} onSubmit={handleSignUpSubmit}>
        <h2 className="title">Sign up</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" className="btn" value="Sign up" />
      </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
            Sign up now to join our community and discover more!
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="login.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
            Sign in to access exclusive content and engage with our community!
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src="reg.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignInSignUp;
