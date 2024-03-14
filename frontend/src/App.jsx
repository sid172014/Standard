
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import './App.css'

import CameraComponent from './components/CameraComponent'
import SignInSignUp from './components/login'
import Form from "./components/Form";


function App() {

  return (
    <div>
  <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<SignInSignUp></SignInSignUp>}></Route>
          <Route path="/form" element={<Form></Form>}></Route>
          <Route path="/kyc" element={<CameraComponent></CameraComponent>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
};



export default App
