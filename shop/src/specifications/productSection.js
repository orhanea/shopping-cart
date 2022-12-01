import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", // generate these action types ; pending, fullFilled, rejected
   async() => { // payload creator
     const response = await axios.get( "http://localhost:4000/products" );
     return response?.data; // is data fetch or not ?
   }
);

// logic
const productSection = createSlice({
  name: "products",
  initialState,
  reducers: {}, // combine it to the shop object in index.js and generate action creators
  extraReducers: 
  { // handle types for fetch
    [fetchProducts.pending]: ( state ) => 
      {
        state.status = "pending";
      },
    [fetchProducts.fulfilled]: ( state, action ) => 
      {
        state.items = action.payload // access the payload
        state.status = "success";
      },
    [fetchProducts.rejected]: ( state ) => 
      {
        state.status = "rejected";
      },
   },
});

export default productSection.reducer;