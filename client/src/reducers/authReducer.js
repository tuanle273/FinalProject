import { LOGIN_BY_GOOGLE_REQUEST, SET_AUTH, UPDATE_USER_PROFILE } from "../contexts/constants";

export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
      case LOGIN_BY_GOOGLE_REQUEST:
        return {
          ...state,
          user: { ...state.user, ...action.payload },
        };
  
    default:
      return state;
  }
};
