import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_SUCCESS,
  BRAND_FETCH_FAIL,
  BRAND_FETCH_SUCCESS,
} from "../contexts/constants";

export const brandReducer = (state, action) => {
  switch (action.type) {
    case BRAND_FETCH_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        brandLoading: false,
        brandError: false,
      };
    case BRAND_FETCH_FAIL:
      return {
        ...state,
        brandLoading: false,
        brandError: true,
      };

    case BRAND_CREATE_SUCCESS:
      return {
        ...state,
        brands: [action.payload, ...state.brands],
      };
    case BRAND_CREATE_FAIL:
      return {
        ...state,
        brandError: true,
      };

    case BRAND_DELETE_SUCCESS:
      return {
        ...state,
        brands: state.brands.filter((brand) => brand._id !== action.payload),
      };
    default:
      return state;
  }
};
