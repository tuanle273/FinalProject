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

  const banUser = async (id) => {
    try {
      const response = await axios.get(apiUrl + "/user/banuser/" + id);

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: BAN_USER_SUCCESS,
          payload: response.data.message,
        });
      }
      return { success: true, message: "BAN User successfully" };
    } catch (error) {
      dispatch({ type: BAN_USER_FAIL });
      return { success: false, message: error.message };
    }
  };
  const unbanUser = async (id) => {
    try {
      const response = await axios.get(apiUrl + "/user/unbanuser/" + id);

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: HISTORY_FETCH_SUCCESS,
          payload: response.data.user,
        });
        return { success: true, message: "UNBAN User successfully" };
      }
    } catch (error) {
      dispatch({ type: HISTORY_FETCH_FAIL });
      return { success: false, message: error.message };
    }
  };

  const cloudinaryUpload = async (fileToUpload) => {
    try {
      const response = await axios.post(
        apiUrl + "/user/cloudinary-upload",
        fileToUpload
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: HISTORY_FETCH_SUCCESS,
          payload: response.data.user,
        });
        return {
          success: true,
          data: response.data,
          message: "UNBAN User successfully",
        };
      }
    } catch (error) {
      dispatch({ type: HISTORY_FETCH_FAIL });
      return { success: false, message: error.message };
    }
  };

  const value = {
    loadHistory,
    userState,
    banUser,
    unbanUser,
    cloudinaryUpload,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
