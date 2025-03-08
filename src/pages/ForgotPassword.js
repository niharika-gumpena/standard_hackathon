import React, { useState } from "react";
import { auth } from "../firebase"; // Import Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; // Import for navigation
import "./ForgotPassword.css"; // Import CSS for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent. Check your inbox!");
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Your Password</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p className="back-to-login">
        Remembered your password? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;