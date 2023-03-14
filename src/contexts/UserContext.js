import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";

import {
  apiUrl,
  BAN_USER_FAIL,
  BAN_USER_SUCCESS,
  HISTORY_FETCH_FAIL,
  HISTORY_FETCH_SUCCESS,
} from "./constants";

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

  const banUser = async (id) => {
    try {
      const response = await axios.get(apiUrl + "/user/banuser/" + id);
      console.log(
        "🚀 ~ file: UserContext.js:45 ~ banUser ~ response:",
        response
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: BAN_USER_SUCCESS,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({ type: BAN_USER_FAIL });
    }
  };
  const unbanUser = async (id) => {
    try {
      const response = await axios.get(apiUrl + "/user/unbanuser/" + id);
      console.log(
        "🚀 ~ file: UserContext.js:38 ~ banUser ~ response:",
        response
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: HISTORY_FETCH_SUCCESS,
          payload: response.data.user,
        });
      }
    } catch (error) {
      dispatch({ type: HISTORY_FETCH_FAIL });
    }
  };
  const value = {
    loadHistory,
    userState,
    banUser,
    unbanUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
