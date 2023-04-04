import {
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_SUCCESS,
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

   
    case VEHICLE_CREATE_FAIL:
      return {
        ...state,
        vehicleError: true,
      };
    case VEHICLE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VEHICLE_UPDATE_SUCCESS:
      const updatedVehicle = action.payload;
      return {
        ...state,
        loading: false,
        vehicles: state.vehicles.map((vehicle) =>
          vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle
        ),
      };
    case VEHICLE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
