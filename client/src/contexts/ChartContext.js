import axios from "axios";
import React, { createContext, useReducer } from "react";
import { discountReducer } from "../reducers/discountReducer";
import { apiUrl } from "./constants";

export const ChartContext = createContext();

export function ChartProvider({ children }) {
  const [discountState, dispatch] = useReducer(discountReducer, {
    discounts: [],
    discountLoading: true,
    discountError: false,
  });

  const countAll = async () => {
    try {
      const response = await axios.get(apiUrl + "/admin/countuser");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: "COUNT USER",
          payload: response.data,
        });
      }
      return {
        success: true,
        data: response.data,
        message: "Discount List",
      };
    } catch (error) {
      dispatch({ type: "COUNT USER FAIL" });
    }
  };
  const checkTransaction = async () => {
    try {
      const response = await axios.get(apiUrl + "/payment/gettransaction");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: "check transaction",
          payload: response.data,
        });
      }
      return {
        success: true,
        data: response.data,
        message: "List",
      };
    } catch (error) {
      dispatch({ type: "fail" });
    }
  };

  const value = {
    countAll,
    checkTransaction,
  };

  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
}
