import {
  BAN_USER_FAIL,
  BAN_USER_SUCCESS,
  HISTORY_FETCH_FAIL,
  HISTORY_FETCH_SUCCESS,
} from "../contexts/constants";

export const userReducer = (state, action) => {
  switch (action.type) {
    case HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        users: action.payload,
        userLoading: false,
        userError: false,
      };
    case HISTORY_FETCH_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: true,
      };
    case BAN_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        userLoading: false,
        userError: false,
      };
    case BAN_USER_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: true,
      };

    default:
      return state;
  }
};
