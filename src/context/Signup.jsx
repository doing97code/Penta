import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false); // State for animation

  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in animation on component mount
  }, []);

  function navigateAnotherPage() {
    navigate("/about");
  }

  function setNamePasswordLocalStorage() {
    if (!name || !password) {
      toast.error("Name and password are required.");
      return;
    }

    const myName = localStorage.getItem("name");
    if (!myName) {
      if (password === confirmPassword) {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

        localStorage.setItem("pw", hashedPassword);
        localStorage.setItem("name", name);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email);

        toast.success("Account created successfully!");

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        navigateAnotherPage();
      } else {
        toast.error("Passwords do not match.");
        return;
      }
    } else {
      toast.info("Account already exists. Please sign in.");
      setTimeout(() => {

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        navigate('/login')
      }, 3000);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-cover bg-center p-8 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      } signup-background sm:scale-[1.05] md:scale-[1.35] lg:scale-[1]`}
    >
      <div
        id="mysignup"
        className="bg-slate-50 hover:bg-slate-200 text-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-2 md:text-4xl lg:text-3xl">
          Welcome to Your Space!
        </h1>
        <h3 className="sm:text-md font-medium text-center text-gray-600 mb-1 md:text-2xl md:m-6 lg:text-[15px] lg:m-2">
          Let's get you started with a free account.
        </h3>

        <form>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:shadow-lg transition duration-300 bg-white"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:shadow-lg transition duration-300"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:shadow-lg transition duration-300"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:shadow-lg transition duration-300"
            />
          </div>

          <button
            type="button"
            onClick={setNamePasswordLocalStorage}
            className="w-full py-2 mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="mt-3 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-medium underline"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Signup;

