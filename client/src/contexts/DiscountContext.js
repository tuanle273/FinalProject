import axios from "axios";
import React, { createContext, useReducer } from "react";
import { discountReducer } from "../reducers/discountReducer";
import {
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_FETCH_FAIL,
  DISCOUNT_FETCH_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
  DISCOUNT_UPDATE_SUCCESS,
  apiUrl,
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
      dispatch({
        type: DISCOUNT_FETCH_FAIL,
      });
    }
  };

  const createDiscount = async (newDiscount) => {
    try {
      const response = await axios.post(apiUrl + "/discount", newDiscount);

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: DISCOUNT_CREATE_SUCCESS,
          payload: response.data.Discount,
        });

        return {
          success: true,
          data: response.data.Discount,
          message: "Discount added successfully",
        };
      }
    } catch (error) {
      dispatch({
        type: DISCOUNT_CREATE_FAIL,
      });
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const checkDiscount = async (code) => {
    try {
      const response = await axios.post(apiUrl + "/discount/checkcode", {
        code,
      });

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
      dispatch({
        type: DISCOUNT_FETCH_FAIL,
      });
    }
  };

  const updateDiscount = async (id, updateDiscount) => {
    try {
      const response = await axios.put(
        `${apiUrl}/discount/${id}`,
        updateDiscount
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: DISCOUNT_UPDATE_SUCCESS,
          payload: response.data.discount,
        });
        return {
          success: true,
          message: "Discount Updated successfully",
        };
      }
    } catch (error) {
      dispatch({
        type: DISCOUNT_UPDATE_FAIL,
      });
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const deleteDiscount = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/discount/${id}`);
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: DISCOUNT_DELETE_SUCCESS,
          payload: id,
        });
        loadDiscount();
        return {
          success: true,
          message: "Discount Delete successfully",
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
    loadDiscount,
    discountState,
    checkDiscount,
    deleteDiscount,
    createDiscount,
    updateDiscount,
  };

  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
}
