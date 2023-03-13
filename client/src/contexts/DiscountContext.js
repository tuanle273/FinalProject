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
    console.log(
      "🚀 ~ file: DiscountContext.js:21 ~ loadDiscount ~ loadDiscount:",
      loadDiscount
    );
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

  const value = {
    loadDiscount,
  };

  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
}
