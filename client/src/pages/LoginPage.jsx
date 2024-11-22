import React, { useState } from "react"; // Import React and useState hook
import "../styles/Login.scss"; // Import the Login page styles
import { setLogin } from "../redux/state"; // Import the setLogin action from Redux state
import { useDispatch } from "react-redux"; // Import useDispatch hook for dispatching actions
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LoginPage = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  const dispatch = useDispatch(); // Initialize dispatch function

  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        // Send POST request to login API
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });

      /* Get data after fetching */
      const loggedIn = await response.json(); // Parse the JSON response

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user, // Update user state in Redux
            token: loggedIn.token, // Update token in Redux
          })
        );
      }

      // Additional code can go here

    } catch (err) {
      console.log("Login failed", err.message); // Log any errors
    }
  };

  // Rest of the component code

};

export default LoginPage; // Export the LoginPage component