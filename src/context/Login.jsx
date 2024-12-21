// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import CryptoJS from "crypto-js";


// function Login() {
//   const [passwordInput, setPasswordInput] = useState('');
//   const [emailInput, setemailInput] = useState('');
//   const navigate = useNavigate();
//   const [fadeIn, setFadeIn] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setFadeIn(true), 100);
//   }, []);

//   function isLoggedIn() {
//     return sessionStorage.getItem('isLoggedIn') === 'true';
//   }

//   function handleLogin() {
//     const savedEmail = localStorage.getItem('email');
//     if (!passwordInput) {
//       window.alert('Fill your Password');
//       // <CheckingAlert message={'Enter password'} message2={'some error occured'}/>
//       return;
//     } else if (!emailInput) {
//       window.alert("Fill your Email");
//       return;
//     }

//     const storedHashedPassword = localStorage.getItem("pw");
//     const hashedInputPassword = CryptoJS.SHA256(passwordInput).toString(CryptoJS.enc.Base64);

//     if (storedHashedPassword === hashedInputPassword || passwordInput === import.meta.env.VITE_ALTERNATIVE_PASSWORD) {
//       sessionStorage.setItem('isLoggedIn', true);
//       navigate('/about');
//     } else {
//       window.alert('Password mismatch. Please try again.');
//     }
//   }

//   function navigateToDataPage() {
//     if (isLoggedIn()) {
//       navigate('/about');
//     } else {
//       window.alert('You need to log in first.');
//     }
//   }


//   function getEmail(){
  

//      const emaillocal = localStorage.getItem('email');
//      console.log(emaillocal);
     
//      window.alert("Your email: "+ emaillocal);
//   }

//   return (
//     <div
//       className={`relative min-h-screen flex items-center justify-center p-8 transition-opacity duration-1000 ${
//         fadeIn ? 'opacity-100' : 'opacity-0'
//       } bg-login-background sm:scale-[1.45] lg:scale-[1]`}
//     >
//       {/* Black overlay */}
//       <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

//       {/* Content */}
//       <div className=" bg-white  text-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full transform hover:bg-slate-200 hover:scale-105 transition-transform duration-300 z-10">
//         <div className="flex justify-start items-center">
//           <h1 className="text-xl font-semibold text-center text-indigo-800 mb-2">
//             Enter Your Email:
//           </h1>
//         </div>
//         <div className="mb-2">
//           <input
//             type="email"
//             value={emailInput}
//             onChange={(e) => setemailInput(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
//           />
//         </div>

//         <div className="flex justify-start items-center">
//           <h1 className="text-xl font-semibold text-center text-indigo-800 mb-3">
//             Enter Your Password:
//           </h1>
//         </div>
//         <div className="mb-3">
//           <input
//             type="password"
//             value={passwordInput}
//             onChange={(e) => setPasswordInput(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
//           />
//         </div>

//         <div className="flex flex-col gap-4">
//           <button
//             onClick={handleLogin}
//             className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 duration-300"
//           >
//             Login
//           </button>

//           <button
//             onClick={navigateToDataPage}
//             className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 duration-300"
//           >
//             View Data
//           </button>
//         </div>

//         <h2 className="mt-2 text-center text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
//             Sign up here
//           </Link>
//           <br />
//           <Link to="/email" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
//             Forgot password?
//           </Link> <br />
//           <button onClick={()=>getEmail()} className='text-indigo-600 hover:text-indigo-800' >Forget email?</button>
//         </h2>
//       </div>
//     </div>
//   );
// }

// export default Login;

























import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setemailInput] = useState('');
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  function isLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  function handleLogin() {
    const savedEmail = localStorage.getItem('email');
    if (!emailInput) { 
      toast.error('Please enter your email.');
      return;
    } else if (!passwordInput) {
      toast.error('Please enter your password.');
      return;
    }

    const storedHashedPassword = localStorage.getItem("pw");
    const hashedInputPassword = CryptoJS.SHA256(passwordInput).toString(CryptoJS.enc.Base64);

    if (storedHashedPassword === hashedInputPassword || passwordInput === import.meta.env.VITE_ALTERNATIVE_PASSWORD) {
      sessionStorage.setItem('isLoggedIn', true);

      setemailInput('');
      setPasswordInput('');

      navigate('/about');
    } else {
      toast.error('Incorrect password. Please try again.');
    }
  }

  function navigateToDataPage() {
    if (isLoggedIn()) {
      setemailInput('');
      setPasswordInput('');
      navigate('/about');
    } else {
      toast.warning('You need to log in first.');
    }
  }

  function getEmail() {
    const emaillocal = localStorage.getItem('email');
    toast.info(`Your email: ${emaillocal || "Not Found"}`);
  }

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center p-8 transition-opacity duration-1000 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      } bg-login-background sm:scale-[1.45] lg:scale-[1]`}
    >
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      {/* Content */}
      <div className=" bg-white  text-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full transform hover:bg-slate-200 hover:scale-105 transition-transform duration-300 z-10">
        <div className="flex justify-start items-center">
          <h1 className="text-xl font-semibold text-center text-indigo-800 mb-2">
            Enter Your Email:
          </h1>
        </div>
        <div className="mb-2">
          <input
            type='email'
            value={emailInput}
            onChange={(e) => setemailInput(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="flex justify-start items-center">
          <h1 className="text-xl font-semibold text-center text-indigo-800 mb-3">
            Enter Your Password:
          </h1>
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={()=>handleLogin()}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 duration-300"
          >
            Login
          </button>

          <button
            onClick={()=>navigateToDataPage()}
            className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 duration-300"
          >
            View Data
          </button>
        </div>

        <h2 className="mt-2 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            Sign up here
          </Link>
          <br />
          <Link to="/email" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            Forget password?
          </Link> <br />
          <button onClick={() => getEmail()} className="text-indigo-600 hover:text-indigo-800">
            Forget email?
          </button>
        </h2>
      </div>
    </div>
  );
}

export default Login;




