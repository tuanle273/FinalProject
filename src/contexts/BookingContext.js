import axios from "axios";
import React, { createContext, useReducer } from "react";
import { bookingReducer } from "../reducers/bookingReducer";

import {
  apiUrl,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DELETE_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKING_UPDATE_SUCCESS,
} from "./constants";

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [BookingState, dispatch] = useReducer(bookingReducer, {
    Bookings: [],
    BookingLoading: true,
    BookingError: false,
  });

  // Load Bookings

  const getAllBooking = async () => {
    try {
      const response = await axios.get(apiUrl + "/booking");

      if (response.status >= 200 && response.status < 300) {
      }
      return { success: true, data: response.data, message: "Booking List" };
    } catch (error) {}
  };

  // Create Booking
  const createBooking = async (newBooking) => {
    try {
      const response = await axios.post(apiUrl + "/Booking", newBooking);
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: BOOKING_CREATE_SUCCESS,
          payload: response.data.Booking,
        });
        return { success: true, message: "Booking added successfully" };
      }
    } catch (error) {
      dispatch({ type: BOOKING_CREATE_FAIL });
      return { success: false, message: error.message };
    }
  };

  //update Booking
  const updateBooking = async (id, updatedBooking) => {
    try {
      const response = await axios.put(
        `${apiUrl}/Booking/${id}`,
        updatedBooking
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: BOOKING_UPDATE_SUCCESS,
          payload: response.data.Booking,
        });
        return { success: true, message: "Booking Updated successfully" };
      }
    } catch (error) {
      dispatch({ type: BOOKING_UPDATE_FAIL });
      return { success: false, message: error.message };
    }
  };

  // Delete Booking
  const deleteBooking = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/Booking/${id}`);
      if (response.data.success) {
        dispatch({ type: BOOKING_DELETE_SUCCESS, payload: id });
        return { success: true, message: "Booking Delete successfully" };
      }
    } catch (error) {
      dispatch({ type: BOOKING_DELETE_FAIL });
      return { success: false, message: error.message };
    }
  };
  const value = {
    BookingState,
    getAllBooking,
    createBooking,
    updateBooking,
    deleteBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
