import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function New_password_fill() {
  const [oldpw, setoldpw] = useState('');
  const [resetPW, setresetPW] = useState('');
  const [confirm_resetPW, setconfirm_resetPW] = useState('');
  const navigate = useNavigate();

  const storedHashedPassword = localStorage.getItem("pw"); // Assume it's the hashed original password

  function reset_new_password() {
    try {
      const hashedInputPassword = CryptoJS.SHA256(oldpw).toString(CryptoJS.enc.Base64);

      if (!oldpw || !resetPW || !confirm_resetPW) {
        toast.error('All fields are required!', { position: "top-center" });
        return;
      }

      if (resetPW !== confirm_resetPW) {
        toast.warning('New passwords do not match. Please try again.', { position: "top-center" });
        return;
      }

      if (hashedInputPassword === storedHashedPassword) {
        const newHashedPassword = CryptoJS.SHA256(resetPW).toString(CryptoJS.enc.Base64);
        localStorage.setItem("pw", newHashedPassword);
        toast.success('Password updated successfully.', { position: "top-center" });
        setTimeout(() => {
          navigate('/login');
          setoldpw('');
        setresetPW('');
        setconfirm_resetPW('');
        }
        
        , 2000); // Redirect after 2 seconds
        
      } else {
        toast.error("The old password is incorrect. Please check and try again.", { position: "top-center" });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.', { position: "top-center" });
    }
  }

  return (
    <div className="w-[full] h-screen bg-gradient-to-br from-pink-400 via-blue-500 to-orange-400 flex justify-center items-center sm:scale-[1.55] lg:scale-[1]">
      <div className="w-[300px] h-[440px] sm:h-[420px] bg-white flex flex-col rounded-md shadow-lg lg:h-[440px]">
        <div className="flex justify-center text-2xl font-semibold mt-6">
          <h1 className="text-indigo-800">Recover Password</h1>
        </div>
        <div className="mx-6 mt-3">
        <label htmlFor="oldpw" className="mb-2 block text-md font-semibold text-slate-600">
  Enter the OTP sent to your registered email:
</label>
          <input
            className="py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md px-3 text-gray-800"
            type="password"
            name="oldpw"
            value={oldpw}
            onChange={(e) => setoldpw(e.target.value)}
          />
        </div>
        <div className="mx-6 mt-6">
          <label htmlFor="resetPW" className="mb-2 block text-md font-semibold text-slate-600">
            Enter your new password:
          </label>
          <input
            className="py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md px-3 text-gray-800"
            type="password"
            name="resetPW"
            value={resetPW}
            onChange={(e) => setresetPW(e.target.value)}
          />
        </div>
        <div className="mx-6 mt-4">
          <label htmlFor="confirm_resetPW" className="mb-2 block text-md text-slate-600 font-semibold">
            Confirm your new password:
          </label>
          <input
            className="py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md px-3 text-gray-800"
            type="password"
            value={confirm_resetPW}
            onChange={(e) => setconfirm_resetPW(e.target.value)}
          />
        </div>
        <div className="mt-5 px-6">
          <button
            onClick={reset_new_password}
            className="w-full text-lg font-semibold bg-indigo-800 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default New_password_fill;
