import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: localStorage.getItem( "items" ) // Check if the item is in the storage or not.
  ? JSON.parse( localStorage.getItem( "items" ) ) 
  : [],
  totalQuantity: 0, // Total number of products in the cart.
  totalAmount: 0, // Total price of the products.
};

const cartSection = createSlice ({
  name: "shopping-cart",
  initialState,
  reducers: { // Generate related actions for the cart.
    addToTheCard ( state, action ) {
      const productIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if ( productIndex >= 0 ) {
        state.items[productIndex].productQuantity += 1;
        toast.info( "Product quantity is increased.", {
          position: "bottom-left",
        });
      } else {
        // Increment the count when the product is already in the cart.
        const productTemp = {...action.payload, productQuantity: 1};
         state.items.push( productTemp );
         toast.success( "New product is added to cart.", {
          position: "bottom-left",
         })
      }
      localStorage.setItem( "items", JSON.stringify( state.items ) ); // Add items to the local storage.
    },

    removeFromTheCart ( state, action ) {
      const nextItems = state.items.filter(
        (item) => item.id !== action.payload.id // Remove an item.
      );

      state.items = nextItems;
      toast.error( "Product is removed from cart.", {
            position: "bottom-left",

      });
      localStorage.setItem( "items", JSON.stringify( state.items ) ); // Decrease the number in the storage.
    },

    decreaseTheCart ( state, action ) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if ( state.items[index].productQuantity > 1 ) {
        state.items[index].productQuantity -= 1;
        toast.info( "Decreased cart quantity.", {
          position: "bottom-left",
        });
      } else if ( state.items[index].productQuantity === 1 ) {
        const nextProductItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );

        state.items = nextProductItems;
        toast.error( "Product is removed from the cart.", {
          position: "bottom-left",
        });
      } 
      localStorage.setItem( "items", JSON.stringify(state.items));
    },

    clearTheCart ( state ) { // Clear complete cart items.
      state.items = [];
      localStorage.setItem( "items", JSON.stringify(state.items));
      toast.error( "Cart is cleared.", { position: "bottom-left" });
    },

    getTheTotal ( state ) { // Take the total price. 
      let { total, quantity } = state.items.reduce(
        (cartTotal, item) => {
          const { price, productQuantity } = item;
          const productTotal = price * productQuantity;

          cartTotal.total += productTotal;
          cartTotal.quantity += productQuantity;

          return cartTotal;
        },
        {
          total : 0,
          quantity : 0,
        }
      );
      state.totalQuantity = quantity;
      state.totalAmount = total;
    }
  },
});

export const { addToTheCard, removeFromTheCart, decreaseTheCart, clearTheCart, getTheTotal } = cartSection.actions;

export default cartSection.reducer;
