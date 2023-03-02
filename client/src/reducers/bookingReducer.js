import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DELETE_SUCCESS,
  BOOKING_FETCH_FAIL,
  BOOKING_FETCH_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
} from "../contexts/constants";

export const bookingReducer = (state, action) => {
  switch (action.type) {
    case BOOKING_FETCH_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
        bookingLoading: false,
        bookingError: false,
      };
    case BOOKING_FETCH_FAIL:
      return {
        ...state,
        bookingLoading: false,
        bookingError: true,
      };

    case BOOKING_CREATE_SUCCESS:
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };
    case BOOKING_CREATE_FAIL:
      return {
        ...state,
        bookingError: true,
      };
    case BOOKING_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOKING_UPDATE_SUCCESS:
      const updatedBooking = action.payload;
      return {
        ...state,
        loading: false,
        bookings: state.bookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        ),
      };
    case BOOKING_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
