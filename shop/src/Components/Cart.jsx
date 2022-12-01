import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import {
  removeFromTheCart,
  decreaseTheCart,
  addToTheCard,
  clearTheCart,
  getTheTotal, 
} from "../specifications/cartSection";

const Cart = () => {

  const cart = useSelector( ( state ) => state.cart );
  
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( getTheTotal() );
  });
 
  const handleCartToRemove = ( product ) => {
    dispatch( removeFromTheCart( product ) );
  };

  const handleCartToDecrease = ( product ) => {
    dispatch( decreaseTheCart( product ) );
  };

  const handleCartToIncrease = ( product ) => {
    dispatch( addToTheCard( product ) );
  };

  const handleCartToClear = ( product ) => {
    dispatch( clearTheCart( product ) );
  };

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: "POST",
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({items: cart.items})
    }).then((response) => {
      return response.json();
    }).then((response) => {
      window.location.assign(response.url);
    });
  };

  return (
    <div className="container-for-cart">
      <h2>Your Shopping Cart</h2>
      {
        cart.items.length === 0 ? (
          <div className = "empty">
          <p> Your cart is currently empty. </p>
          <div className = "start">
            <Link to="/">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="bi bi-arrow-left-square" 
                viewBox="0 0 16 16"
              >
                <path 
                  fillRule="evenodd" 
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
        ) : (
          <div>
          <div className="product-titles">
            <h3 className="product-title">Product</h3>
            <h3 className="product-price">Price</h3>
            <h3 className="product-quantity">Quantity</h3>
            <h3 className="product-total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.items &&
              cart.items.map( ( cartItem ) => (
                <div className="cart-product-item" key={ cartItem.id }>
                  <div className="product-in-the-cart">
                    <img src={ cartItem.image } alt={ cartItem.name } />
                    <div>
                      <h3>{ cartItem.name }</h3>
                      <p>{ cartItem.desc }</p>
                      <button onClick={ () => handleCartToRemove( cartItem ) }>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${ cartItem.price }</div>
                  <div className="product-quantity-in-the-cart">
                    <button onClick={ () => handleCartToDecrease( cartItem )}>
                      -
                    </button>
                    <div className="counter">{ cartItem.productQuantity }</div>
                    <button onClick={ () => handleCartToIncrease( cartItem ) }>
                      +
                    </button>
                  </div>
                  <div className="total-price">
                    ${ cartItem.price * cartItem.productQuantity }
                  </div>
                </div>
              ))}
          </div>
          <div className="summary">
            <button className="clear-btn" onClick={ () => handleCartToClear() }>
              Clear Cart
            </button>
            <div className="checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${ cart.totalAmount }</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button variant="success" onClick={checkout}>Check out</button>
              <div className="continue">
                <Link to="/">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-arrow-left-square" 
                    viewBox="0 0 16 16"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                    />
                  </svg>
                  <span>Continue to shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        )
      }
    </div>     
  );
  
};

export default Cart;
