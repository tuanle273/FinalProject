import {
  FIND_VEHICLE,
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_DELETE_FAIL,
  VEHICLE_DELETE_SUCCESS,
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
        vehicles: [action.payload, ...state.vehicles.vehicles],
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
    case FIND_VEHICLE:
      return { ...state, vehicle: action.payload };
    case VEHICLE_UPDATE_FAIL:
      return {
        ...state,
        vehicleLoading: false,
        vehicleError: action.payload,
      };

    
    case VEHICLE_DELETE_SUCCESS:
      const newVehicles = state.vehicles.vehicles.filter(
        (vehicle) => vehicle._id !== action.payload
      );
      return {
        ...state,
        vehicles: newVehicles,
      };
    case VEHICLE_DELETE_FAIL:
      return state;
    default:
      return state;
  }
};
