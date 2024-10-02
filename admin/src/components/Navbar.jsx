import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { assets } from '../assets/assets'; // Adjust the path if necessary
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const logout = () => {
    setAToken(''); // Clear token
    localStorage.removeItem('aToken'); // Remove from local storage
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.adminLogo} alt="Admin Logo" /> {/* Use assets for admin logo */}
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button className='bg-primary text-white text-sm px-10 py-2 rounded-full' onClick={logout}>Logout</button> {/* Add onClick to the button */}
    </div>
  );
};

export default Navbar;
