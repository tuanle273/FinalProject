import axios from "axios";
import React, { createContext, useReducer } from "react";
import { discountReducer } from "../reducers/discountReducer";
import {
  apiUrl,
  DISCOUNT_FETCH_FAIL,
  DISCOUNT_FETCH_SUCCESS,
} from "./constants";

export const BrandContext = createContext();

export function BrandProvider({ children }) {
  const [discountState, dispatch] = useReducer(discountReducer, {
    discounts: [],
    discountLoading: true,
    discountError: false,
  });

  // Load discounts
  const loadBrand = async () => {
    try {
      const response = await axios.get(apiUrl + "/brand");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: DISCOUNT_FETCH_SUCCESS,
          payload: response.data.VehicleBrand,
        });
        console.log(
          "🚀 ~ file: BrandContext.js:29 ~ loadBrand ~  response.data.VehicleBrand:",
          response.data.VehicleBrand
        );
      }
      return {
        success: true,
        data: response.data.VehicleBrand,
        message: "Discount List",
      };
    } catch (error) {
      dispatch({ type: DISCOUNT_FETCH_FAIL });
    }
  };

  const value = {
    loadBrand,
  };

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
}
