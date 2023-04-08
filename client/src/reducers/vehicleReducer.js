import {
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_DELETE_FAIL,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_SUCCESS,
  VEHICLE_UPDATE_FAIL,
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
        vehicles: [action.payload, ...state.vehicles],
      };
    case VEHICLE_CREATE_FAIL:
      return state;
    case VEHICLE_UPDATE_SUCCESS:
      return {
        ...state,
        vehicles: state.vehicles.map((vehicle) =>
          vehicle._id === action.payload._id ? action.payload : vehicle
        ),
      };
    case VEHICLE_UPDATE_FAIL:
      return state;
    case VEHICLE_DELETE_SUCCESS:
      return {
        ...state,
        vehicles: state.vehicles.filter(
          (vehicle) => vehicle._id !== action.payload
        ),
      };
    case VEHICLE_DELETE_FAIL:
      return state;
    default:
      return state;
  }
};
