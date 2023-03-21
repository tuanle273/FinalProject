import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";
import {
  apiUrl,
  FETCH_USER_DATA,
  LOCAL_STORAGE_TOKEN_NAME,
  SET_AUTH,
  UPDATE_USER_PROFILE,
} from "./constants";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const getAllUser = async () => {
    try {
      const response = await axios.get(apiUrl + "/user/alluser");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: FETCH_USER_DATA,
          payload: response.data.Users,
        });
      }
      return { success: true, data: response.data.Users, message: "User List" };
    } catch (error) {
      console.log(error);
    }
  };
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(apiUrl + "/auth");
      if (response.data.success) {
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  useEffect(() => {
    loadUser();
    return () => {};
  }, []);

  //Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(apiUrl + "/auth/login", userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else
        return {
          success: false,
          message: error.message,
        };
    }
  };

  //Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(apiUrl + "/auth/register", userForm);
      console.log(
        "🚀 ~ file: AuthContext.js:86 ~ registerUser ~ response:",
        response
      );
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else
        return {
          success: false,
          message: error.message,
        };
    }
  };
  //Logout

  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  const forgotPassword = async (formData) => {
    try {
      const response = await axios.post(apiUrl + "/auth/forgotpass", formData);

      if (response.data.success) return response.data.success;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else
        return {
          success: false,
          message: error.message,
        };
    }
  };
  const passwordReset = async (token, formData) => {
    try {
      const response = await axios.post(
        apiUrl + "/auth/reset-password/" + token,
        formData
      );

      if (response && response.status === 200) return response.data.message;
    } catch (error) {
      if (error.response && error.response.status === 400)
        return error.response.data;
      else
        return {
          success: false,
          message: error.message,
        };
    }
  };
  const updateUserProfile = async (id, userData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/user/profile/${id}`,
        userData
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: UPDATE_USER_PROFILE,
          payload: response.data.userDetail,
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else
        return {
          success: false,
          message: error.message,
        };
    }
  };

  //context data
  const authContextData = {
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    authState,
    forgotPassword,
    passwordReset,
    getAllUser,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
