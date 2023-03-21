import axios from "axios";
import React, { createContext, useReducer } from "react";
import { discountReducer } from "../reducers/discountReducer";
import {
  apiUrl,
  DISCOUNT_FETCH_FAIL,
  DISCOUNT_FETCH_SUCCESS,
} from "./constants";

export const DiscountContext = createContext();

export function DiscountProvider({ children }) {
  const [discountState, dispatch] = useReducer(discountReducer, {
    discounts: [],
    discountLoading: true,
    discountError: false,
  });

  // Load discounts
  const loadDiscount = async () => {
    try {
      const response = await axios.get(apiUrl + "/discount");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: DISCOUNT_FETCH_SUCCESS,
          payload: response.data.discount,
        });
      }
      return {
        success: true,
        data: response.data.discount,
        message: "Discount List",
      };
    } catch (error) {
      dispatch({ type: DISCOUNT_FETCH_FAIL });
    }
  };

  const checkDiscount = async (code) => {
    console.log(
      "🚀 ~ file: DiscountContext.js:41 ~ checkDiscount ~ discountCode:",
      code
    );
    try {
      const response = await axios.post(apiUrl + "/discount/checkcode", {
        code,
      });
      console.log(
        "🚀 ~ file: DiscountContext.js:46 ~ checkDiscount ~ response:",
        response
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: DISCOUNT_FETCH_SUCCESS,
          payload: response.data.discount,
        });
      }
      return {
        success: true,
        data: response.data.discount,
        message: "Discount List",
      };
    } catch (error) {
      dispatch({ type: DISCOUNT_FETCH_FAIL });
    }
  };
  const value = {
    loadDiscount,
    checkDiscount,
  };

  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
}
