// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the deleteOrder slice
const initialState = {};

// Creating a slice of the Redux store for managing order deletion related actions and state
export const deleteOrderSlice = createSlice({
  name: "deleteOrder", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling order deletion request
    deleteOrderRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful order deletion
    deleteOrderSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.message = action.payload; // Setting success message received from the action payload
    },
    // Reducer function for handling failed order deletion
    deleteOrderFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { deleteOrderRequest, deleteOrderSuccess, deleteOrderFailure } =
  deleteOrderSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default deleteOrderSlice.reducer;
