import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Abhirikta() {
  // State to store background image URL
  const [bgPic, setBgPic] = useState('');

  // Environment variables for images
  const bgPicPC = 'https://images.unsplash.com/photo-1504406438164-c0e042535100?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const bgPicMobile = import.meta.env.VITE_BG_MOBILE;
  const brth_link =import.meta.env.VITE_BIRTHDAY_LINK;

  // Handle window resize for responsive background image
  useEffect(() => {
    const updateBgPic = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setBgPic(bgPicMobile); // Set mobile background image
      } else {
        setBgPic(bgPicPC); // Set PC background image
      }
    };

    // Set initial background
    updateBgPic();

    // Update background on window resize
    window.addEventListener('resize', updateBgPic);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateBgPic);
    };
  }, [bgPicPC, bgPicMobile]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6 sm:scale-[1.35] lg:scale-[1]"
      style={{
        backgroundImage: `url(${bgPic})`, // Dynamic background based on screen size
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative text-gray-800 rounded-lg shadow-lg w-full max-w-lg p-8 space-y-6 z-10">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-3">
          Welcome, <span className="text-green-400">{localStorage.getItem('name')}</span>
        </h1>

        {/* Link to Birthday page */}
        <Link
          to={brth_link}
          target="_blank"
          className="block w-full text-center text-lg font-semibold bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-lg transition duration-300"
        >
          Birthday page
        </Link>
      </div>
    </div>
  );
}
