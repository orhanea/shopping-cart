import './App.css';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navigation from "./Components/Navigation";
import Cart from './Components/Cart';
import Home from './Components/Home';
import PageError from './Components/PageError';
import Success from './Components/Success';
import Cancel from './Components/Cancel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navigation />
        <div class="content-container">
          <Routes>
            <Route path="/cart" element={ <Cart /> } />
            <Route path="success" element={ <Success />} />
            <Route path="cancel" element={ <Cancel />} />
            <Route path="/page-does-not-exist" element={ <PageError />} />
            <Route path="/" element={ <Home /> } />  
          </Routes>   
        </div>  
      </BrowserRouter>
    </div>
  );
};

export default App;
