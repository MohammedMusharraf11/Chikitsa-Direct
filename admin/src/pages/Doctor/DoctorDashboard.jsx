import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const { dToken, getAppointments, appointments, cancelAppointment, logoutDoctor } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dToken) {
      getAppointments();
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [dToken, getAppointments, navigate]);

  // Logout handler
  const handleLogout = () => {
    logoutDoctor(); // Clear token and context
    navigate('/login'); // Redirect to login
  };

  return appointments && (
    <div className="m-5">

      <div className="flex flex-wrap gap-3">

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2  border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{appointments.length}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        {/* Add other doctor-related cards here */}

      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {appointments.map((item, index) => (
            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
              <img className="rounded-full w-10" src={item.docData.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
              </div>

              {
                item.cancelled
                  ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  : <img onClick={() => cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.delete_icon} alt="" />
              }
            </div>
          ))}
        </div>

      </div>

      {/* Logout button */}
      <div className="mt-5">
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default DoctorDashboard;
