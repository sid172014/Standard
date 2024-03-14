
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import './App.css'

import CameraComponent from './components/CameraComponent'
import SignInSignUp from './components/login'


function App() {

  const [userInfo,setUserInfo] = useState({
    username : "",
    password : "",
    email : ""
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSignUp userInfo={userInfo} setUserInfo={setUserInfo}></SignInSignUp>}></Route>
          <Route path="/kyc" element={<CameraComponent></CameraComponent>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};



export default App
