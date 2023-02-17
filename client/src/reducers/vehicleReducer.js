import { VEHICLE_CREATE_FAIL, VEHICLE_CREATE_SUCCESS, VEHICLE_DELETE_SUCCESS, VEHICLE_FETCH_FAIL, VEHICLE_FETCH_SUCCESS } from "../contexts/constants";

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
      return {
        ...state,
        vehicleError: true,
      };
    case VEHICLE_DELETE_SUCCESS:
      return {
        ...state,
        vehicles: state.vehicles.filter(
          (vehicle) => vehicle._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
