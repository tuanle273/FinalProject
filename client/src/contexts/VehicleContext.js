import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { vehicleReducer } from "../reducers/vehicleReducer";
import {
  apiUrl,
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_DELETE_FAIL,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_FETCH_FAIL,
  VEHICLE_FETCH_SUCCESS,
  VEHICLE_UPDATE_FAIL,
  VEHICLE_UPDATE_REQUEST,
  VEHICLE_UPDATE_SUCCESS,
} from "./constants";

export const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [vehicleState, dispatch] = useReducer(vehicleReducer, {
    vehicles: [],
    vehicleLoading: true,
    vehicleError: false,
  });
  //Modal Create
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //Modal Edit
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Modal Delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  // Load vehicles
  const loadVehicles = async () => {
    try {
      const response = await axios.get(apiUrl + "/vehicle");

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: VEHICLE_FETCH_SUCCESS,
          payload: response.data.vehicles,
        });
      }
    } catch (error) {
      dispatch({ type: VEHICLE_FETCH_FAIL });
    }
  };
  useEffect(() => loadVehicles(), []);

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

  //update vehicle
  const updateVehicle = (id, updatedVehicle) => async (dispatch) => {
    try {
      dispatch({ type: VEHICLE_UPDATE_REQUEST });

      const response = await axios.put(
        `${apiUrl}/vehicle/${id}`,
        updatedVehicle
      );

      if (response.data.success) {
        dispatch({
          type: VEHICLE_UPDATE_SUCCESS,
          payload: response.data.vehicle,
        });
        return { success: true, message: "Vehicle updated successfully" };
      } else {
        dispatch({ type: VEHICLE_UPDATE_FAIL, payload: response.data.error });
        return { success: false, message: response.data.error };
      }
    } catch (error) {
      dispatch({ type: VEHICLE_UPDATE_FAIL, payload: error.message });
      return { success: false, message: error.message };
    }
  };

  // Delete vehicle
  const deleteVehicle = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/vehicle/${id}`);
      if (response.data.success) {
        dispatch({ type: VEHICLE_DELETE_SUCCESS, payload: id });
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
  };

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}
