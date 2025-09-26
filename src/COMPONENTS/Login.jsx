import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = "https://cicdprojectbackend-production.up.railway.app"; // live backend URL

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Login API call
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", data.username);

        // Get user details
        const userResponse = await fetch(`${API_URL}/api/auth/user/${data.username}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem("userId", userData.id);
        }

        // Navigate to Home page
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      // Signup API call
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Account created successfully! You can now log in.");
      } else {
        const errorData = await response.json();
        alert("Signup failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong during signup");
    }
  };

  return (
    <div className="page-wrapper">
      {/* Portfolio app in center */}
      <div className="portfolio-container">
        <h1>Portfolio App</h1>
      </div>

      {/* Login inputs at top-right */}
      <div className="login-top-right">
        <form onSubmit={handleLogin} className="login-inline-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {/* <button type="button" onClick={handleSignup}>
            Signup
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
