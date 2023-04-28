import {
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_SUCCESS,
  VEHICLE_UPDATE_FAIL,
  VEHICLE_UPDATE_REQUEST,
  VEHICLE_UPDATE_SUCCESS,
} from "../contexts/constants";

export const vehicleReducer = (state, action) => {
  switch (action.type) {
    case VEHICLE_FETCH_SUCCESS:
      return {
        ...state,
        vehicles: action.payload,
        vehicleLoading: false,
        vehicleError: false,
      };
    case VEHICLE_FETCH_FAIL:
      return {
        ...state,
        vehicleLoading: false,
        vehicleError: true,
      };

    case VEHICLE_CREATE_SUCCESS:
      return {
        ...state,
        vehicles: action.payload,
        vehicleLoading: false,
        vehicleError: null,
      };
    case VEHICLE_CREATE_FAIL:
      return {
        ...state,
        vehicleError: true,
      };
    case VEHICLE_UPDATE_REQUEST:
      return {
        ...state,
        vehicleLoading: true,
      };
    case VEHICLE_UPDATE_SUCCESS:
      return {
        ...state,
        vehicleLoading: false,
        vehicles: action.payload,
      };
    case VEHICLE_UPDATE_FAIL:
      return {
        ...state,
        vehicleLoading: false,
        vehicleError: action.payload,
      };

    default:
      return state;
  }
};
