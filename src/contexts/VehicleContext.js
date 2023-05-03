import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { vehicleReducer } from "../reducers/vehicleReducer";
import {
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_DELETE_FAIL,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_SUCCESS,
  VEHICLE_UPDATE_FAIL,
  apiUrl,
} from "./constants";

export const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [vehicleState, dispatch] = useReducer(vehicleReducer, {
    vehicles: [],
    vehicleLoading: true,
    vehicleError: false,
  });

  // Load vehicles
  const loadVehicles = async () => {
    try {
      const response = await axios.get(apiUrl + "/vehicle");
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: VEHICLE_FETCH_SUCCESS,
          payload: response.data.vehicle,
        });
      }
      return {
        success: true,
        data: response.data.vehicle,
        message: "Vehicle List",
      };
    } catch (error) {
      dispatch({ type: VEHICLE_FETCH_FAIL });
    }
  };
  useEffect(() => {
    loadVehicles();
    return () => {};
  }, []);
  //get Detail vehicle

  const getDetailVehicle = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/vehicle/${id}`);
      if (response.status >= 200 && response.status < 300) {
  
        dispatch({
          type: VEHICLE_FETCH_SUCCESS,
          payload: response.data.vehicles,
        });
        return {
          success: true,
          data: response.data.vehicles,
          message: "Vehicle Founded",
        };
      }
    } catch (error) {
      dispatch({ type: VEHICLE_FETCH_FAIL });
    }
  };

  // Create vehicle
  const createVehicle = async (newVehicle) => {
    try {
      const response = await axios.post(apiUrl + "/vehicle", newVehicle);

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: VEHICLE_CREATE_SUCCESS,
          payload: response.data.vehicle,
        });

        return { success: true, message: "Vehicle added successfully" };
      }
    } catch (error) {
      dispatch({ type: VEHICLE_CREATE_FAIL });
      return { success: false, message: error.message };
    }
  };
  //find vehicle
  const findVehicle = (vehicleId) => {
    const vehicle = vehicleState.vehicles.find((vehicle) => {
      return vehicle._id === vehicleId;
    });
    return {
      success: true,
      data: vehicle,
      message: "Vehicle added successfully",
    };
  };

  //update vehicle
  const updateVehicle = async (id, updatedVehicle) => {
    try {
      const response = await axios.put(
        `${apiUrl}/vehicle/${id}`,
        updatedVehicle
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: "VEHICLE_UPDATE_SUCCESS",
          payload: response.data.vehicles,
        });
        return { success: true, message: "Vehicle Updated successfully" };
      }
    } catch (error) {
      dispatch({ type: VEHICLE_UPDATE_FAIL });
      return { success: false, message: error.message };
    }
  };

  // Delete vehicle
  const deleteVehicle = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/vehicle/${id}`);
      if (response.status >= 200 && response.status < 300) {
        dispatch({ type: VEHICLE_DELETE_SUCCESS, payload: id });
        loadVehicles();
        return { success: true, message: "Vehicle Delete successfully" };
      }
    } catch (error) {
      dispatch({ type: VEHICLE_DELETE_FAIL });
      return { success: false, message: error.message };
    }
  };

  const value = {
    vehicleState,
    loadVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    findVehicle,
    getDetailVehicle,
  };

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}