import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, { fetchProducts } from './specifications/productSection';
import cartReducer, { getTheTotal } from "./specifications/cartSection";
import { productsApi } from "./specifications/productsApi";

const store = configureStore({ // The center of Application's place.
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer, // Get the name of the API.
  },
  middleware: ( getDefaultMiddleware ) => 
    getDefaultMiddleware().concat( productsApi.middleware ),
});

// Create actions.
store.dispatch( fetchProducts() );
store.dispatch( getTheTotal() );

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
  <Provider store = { store }> 
    <App />  
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
