import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmailSender() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.", {
        position: "top-center",
      });
      return;
    }

    const serviceID = "service_x1yvsmt";
    const templateID = "template_fmsouph";
    const userID = "XdcwXBBH8Ec1x3TbW";

    const localStorage_data =
      localStorage.getItem("name") + Math.round(Math.random() * 100000);
    const localStorage_email = localStorage.getItem("email");

    if (email !== localStorage_email) {
      toast.error("This email is not registered.", {
        position: "top-center",
      });
      return;
    }

    const hashedPassword = CryptoJS.SHA256(localStorage_data).toString(CryptoJS.enc.Base64);
    localStorage.setItem("pw", hashedPassword);

    const templateParams = {
      to_name: localStorage.getItem("name"),
      from_name: "Online Diary, Penta",
      to_email: email, // Recipient email
      message: localStorage_data, // Message content
    };

    console.log("Sending email to:", email); // Debugging log

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        toast.success("Email sent successfully!", {
          position: "top-center",
        });
        
        setTimeout(()=>{
          navigate("/recover_password");
        }, 2000)
        setEmail("");
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        toast.error("Failed to send email. Please try again later.", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1fcb8] via-[#6284FF] to-red-700 flex items-center justify-center overflow-hidden m-0 p-0 sm:scale-[1.45] lg:scale-[1]">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md overflow-hidden">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-black-700 mb-6">
          Send an Email
        </h1>

        {/* Form */}
        <form onSubmit={sendEmail} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Recipient Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none max-w-full"
              placeholder="Enter your registered email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send Email
          </button>
        </form>
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

export default EmailSender;
