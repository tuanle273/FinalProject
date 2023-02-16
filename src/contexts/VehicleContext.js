import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiUrl } from "./constants";

export const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //get all vehicle
  const getVehicles = () => {
    setIsLoading(true);
    axios
      .get(apiUrl + "/vehicle")
      .then((response) => {
        setData(response.data.vehicles);
        setIsLoading(false);
      })

      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getVehicles();
  }, []);

  //get all vehicle
  const deletePost = () => {
    setIsLoading(true);
    axios
      .delete(apiUrl + "/vehicle/")
      .then((response) => {
        setData(response.data.vehicles);
        setIsLoading(false);
      })

      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getVehicles();
  }, []);
  const value = {
    data,
    isLoading,
    isError,
  };

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}
