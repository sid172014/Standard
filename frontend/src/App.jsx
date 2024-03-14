
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import './App.css'

import CameraComponent from './components/CameraComponent'
import SignInSignUp from './components/login'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSignUp></SignInSignUp>}></Route>
          <Route path="/kyc" element={<CameraComponent></CameraComponent>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};



export default App
