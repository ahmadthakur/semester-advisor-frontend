import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data); // handle success

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
