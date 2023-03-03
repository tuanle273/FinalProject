import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";

import { apiUrl, HISTORY_FETCH_FAIL, HISTORY_FETCH_SUCCESS } from "./constants";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, {
    users: [],
    userLoading: true,
    userError: false,
  });

  const loadHistory = async () => {
    try {
      const response = await axios.get(apiUrl + "/user/history");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: HISTORY_FETCH_SUCCESS,
          payload: response.data.bookingDetail,
        });
      }
    } catch (error) {
      dispatch({ type: HISTORY_FETCH_FAIL });
    }
  };
  useEffect(() => {
    loadHistory();
    return () => {};
  }, []);

  const value = {
    loadHistory,
    userState,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
