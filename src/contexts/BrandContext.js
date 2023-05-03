import axios from "axios";
import React, { createContext, useReducer } from "react";
import { brandReducer } from "../reducers/brandReducer";
import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_SUCCESS,
  BRAND_FETCH_SUCCESS,
  DISCOUNT_FETCH_FAIL,
  apiUrl,
} from "./constants";

export const BrandContext = createContext();

export function BrandProvider({ children }) {
  const [brandState, dispatch] = useReducer(brandReducer, {
    brands: [],
    brandLoading: true,
    brandError: false,
  });

  // Load discounts
  const loadBrand = async () => {
    try {
      const response = await axios.get(apiUrl + "/brand");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: BRAND_FETCH_SUCCESS,
          payload: response.data.VehicleBrand,
        });
      }
      return {
        success: true,
        data: response.data.VehicleBrand,
        message: "Brand List",
      };
    } catch (error) {
      dispatch({ type: DISCOUNT_FETCH_FAIL });
    }
  };

  const createBrand = async (newDiscount) => {
    try {
      const response = await axios.post(apiUrl + "/brand", newDiscount);

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: BRAND_CREATE_SUCCESS,
          payload: response.data.Brand,
        });

        return {
          success: true,
          data: response.data.Brand,
          message: "Brand added successfully",
        };
      }
    } catch (error) {
      dispatch({
        type: BRAND_CREATE_FAIL,
      });
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const deleteBrand = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/brand/${id}`);
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: BRAND_DELETE_SUCCESS,
          payload: id,
        });
        loadBrand();
        return {
          success: true,
          message: "Brand Delete successfully",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const value = {
    loadBrand,
    brandState,
    deleteBrand,
    createBrand,
  };

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
}
