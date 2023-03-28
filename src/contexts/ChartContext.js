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

  const value = {
    countAll,
  };

  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
}
