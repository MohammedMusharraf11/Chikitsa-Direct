import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const [dashData, setDashData] = useState(null); // Add state for dashboard data

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDashData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashData(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getDashData, // Include getDashData in context value
    dashData, // Include dashData in context value
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
