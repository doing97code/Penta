import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [animationStart, setAnimationStart] = useState(false);
  const videoRef = useRef(null);

  // Trigger animation after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStart(true);
    }, 50); // Delay ensures the animation is applied properly

    return () => clearTimeout(timer);
  }, []);

  // Optimize video loading using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const video = videoRef.current;
          if (video) {
            video.load(); // Start loading the video when it enters the viewport
          }
        }
      },
      { threshold: 0.5 } // Trigger loading when 50% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
      observer.disconnect(); // Cleanup observer
    };
  }, []);

  return (
    <div
      className="home-container min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative sm:scale-[1.25] md:scale-[1.1] lg:scale-[1]"
    >
      {/* Lazy Loaded Video Background */}
      <video
        preload="auto"
        className="background-video absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        ref={videoRef}
        poster="/images/scrnshot.png" // Show fallback image while video loads
        onCanPlay={() => console.log('Video is ready to play!')} // Debug or state tracking
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Outer Card */}
      <div
        className={`md:bg-white text-gray-800 rounded-xl w-full max-w-lg p-8 space-y-8 relative z-10 home-form slide-in ${
          animationStart ? 'slide-in-start' : ''
        }`}
      >
        {/* Welcome Section */}
        <div className="p-6 rounded-lg">
          <h1
            className={`text-5xl font-extrabold text-center text-white mb-4 sm:text-black slide-in ${
              animationStart ? 'slide-in-start' : ''
            }`}
          >
            Penta
          </h1>
          <p
            className={`text-sm text-center text-gray-200 leading-relaxed md:text-black slide-in ${
              animationStart ? 'slide-in-start' : ''
            }`}
          >
            A haven for your thoughts, ideas, and inspirations. Begin your journey of mindful journaling with simplicity
            and security.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <Link
            to="/signup"
            className={`block w-full text-center text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg shadow-md transition-all duration-300 slide-in ${
              animationStart ? 'slide-in-start' : ''
            }`}
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className={`block w-full text-center text-lg font-semibold bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg shadow-md transition-all duration-300 slide-in ${
              animationStart ? 'slide-in-start' : ''
            }`}
          >
            Access Journal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
