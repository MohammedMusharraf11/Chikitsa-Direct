import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
<<<<<<< HEAD
  
    // ... context data
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken]= useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments,setAppointments]= useState([])
    const [dashData,setDashData]= useState(false)
    const [profileData, setProfileData] = useState(false);
=======
>>>>>>> 91ea97b725a114cadc6fa00e8173e74f8408acde

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
  const [appointments, setAppointments] = useState([]);

  // Fetch doctor's appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Mark appointment as complete
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
<<<<<<< HEAD
    const cancelAppointment = async (appointmentId) => {
      try {
        const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId },{headers:{dToken}})
        if (data.success) {
          toast.success(data.message)
          getAppointments()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

    const getProfileData = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/doctor/profile',{ headers: { dToken } });
    
        if (data.success) {
          setProfileData(data.profileData);
          console.log(data.profileData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };


    const value={
      dToken,setDToken,
      backendUrl,
      appointments,setAppointments,
      getAppointments,completeAppointment,cancelAppointment,
      dashData, setDashData, getDashData,
      profileData,getProfileData,
      setProfileData,
    }
  
=======
  };

  // Logout function to clear the token and reset state
  const logoutDoctor = () => {
    localStorage.removeItem('dToken'); // Remove token from localStorage
    setDToken(''); // Reset the token state
    toast.success('Logged out successfully');
  };

  const value = {
    dToken, setDToken,
    backendUrl,
    appointments, setAppointments,
    getAppointments, completeAppointment, cancelAppointment,
    logoutDoctor // Include logoutDoctor in the context value
  };
>>>>>>> 91ea97b725a114cadc6fa00e8173e74f8408acde

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
