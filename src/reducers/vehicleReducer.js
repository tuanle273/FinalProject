export const vehicleReducer = (state, action) => {
  switch (action.type) {
    case "VEHICLE_FETCH_SUCCESS":
      return {
        ...state,
        vehicles: action.payload,
        vehicleLoading: false,
        vehicleError: false,
      };
    case "VEHICLE_FETCH_FAIL":
      return {
        ...state,
        vehicleLoading: false,
        vehicleError: true,
      };
    default:
      return state;
  }
};
