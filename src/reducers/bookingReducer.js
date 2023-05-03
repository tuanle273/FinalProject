import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DELETE_SUCCESS,
  BOOKING_FETCH_FAIL,
  BOOKING_FETCH_SUCCESS,
  BOOKING_LOAD_FAIL,
  BOOKING_LOAD_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
} from "../contexts/constants";

export const bookingReducer = (state, action) => {
  switch (action.type) {
    case BOOKING_FETCH_SUCCESS:
      return {
        ...state,
        Bookings: action.payload,
        BookingLoading: false,
        BookingError: false,
      };
    case BOOKING_FETCH_FAIL:
      return {
        ...state,
        BookingLoading: false,
        BookingError: true,
      };
    case BOOKING_LOAD_SUCCESS:
      return {
        ...state,
        Bookings: action.payload,
        BookingLoading: false,
        BookingError: false,
      };
    case BOOKING_LOAD_FAIL:
      return {
        ...state,
        BookingLoading: false,
        BookingError: true,
      };
    case BOOKING_CREATE_SUCCESS:
      return {
        ...state,
        Bookings: action.payload,
        BookingLoading: false,
        BookingError: null,
      };
    case BOOKING_CREATE_FAIL:
      return {
        ...state,
        BookingError: true,
      };
    case BOOKING_UPDATE_REQUEST:
      return {
        ...state,
        BookingLoading: true,
      };
    case BOOKING_UPDATE_SUCCESS:
      return {
        ...state,
        BookingLoading: false,
        Bookings: action.payload,
      };
    case BOOKING_UPDATE_FAIL:
      return {
        ...state,
        BookingLoading: false,
        BookingError: action.payload,
      };

    case BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        Bookings: action.payload,
      };
    default:
      return state;
  }
};
