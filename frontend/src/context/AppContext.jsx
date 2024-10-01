import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  // Define the value object that will be shared
  const value = {
    doctors,
    currencySymbol
  };

  // Fetching the doctor's data from the API
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors); // Use the correct key from the response
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Run the getDoctorsData function once when the component mounts
  useEffect(() => {
    getDoctorsData();
    console.log(doctors)
  }, []); // Empty dependency array ensures this runs only once on mount

  // Provide the context to children components
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
