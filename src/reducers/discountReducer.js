import {
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_FETCH_FAIL,
  DISCOUNT_FETCH_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_UPDATE_SUCCESS,
} from "../contexts/constants";

export const discountReducer = (state, action) => {
  switch (action.type) {
    case DISCOUNT_FETCH_SUCCESS:
      return {
        ...state,
        discounts: action.payload,
        discountLoading: false,
        discountError: false,
      };
    case DISCOUNT_FETCH_FAIL:
      return {
        ...state,
        discountLoading: false,
        discountError: true,
      };

    case DISCOUNT_CREATE_SUCCESS:
      return {
        ...state,
        discounts: [action.payload, ...state.discounts],
      };
    case DISCOUNT_CREATE_FAIL:
      return {
        ...state,
        discountError: true,
      };
    case DISCOUNT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DISCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        discounts: action.payload,
      };
    case DISCOUNT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DISCOUNT_DELETE_SUCCESS:
      return {
        ...state,
        discounts: state.discounts.filter(
          (discount) => discount._id !== action.payload
        ),
      
      };
    default:
      return state;
  }
};
