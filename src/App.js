import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";
import EnterGrades from "./components/EnterGrades";
import ViewRecommendations from "./components/ViewRecommendations";
import Dashboard from "./components/Dashboard";
import ViewGrades from "./components/ViewGrades";
import UpdateGrades from "./components/UpdateGrades";
import AddGrades from "./components/AddGrades";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/checksession",
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Failed to check session", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or replace with a loading spinner
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/grades"
        element={isLoggedIn ? <EnterGrades /> : <Navigate to="/login" />}
      />
      <Route
        path="/recommendations"
        element={
          isLoggedIn ? <ViewRecommendations /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/viewgrades"
        element={isLoggedIn ? <ViewGrades /> : <Navigate to="/login" />}
      />
      <Route
        path="/addgrades"
        element={isLoggedIn ? <AddGrades /> : <Navigate to="/login" />}
      />
      <Route
        path="/updategrades"
        element={isLoggedIn ? <UpdateGrades /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
