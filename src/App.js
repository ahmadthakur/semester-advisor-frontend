import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";
import EnterGrades from "./components/EnterGrades";
import ViewRecommendations from "./components/ViewRecommendations";
import Dashboard from "./components/Dashboard";
import ViewGrades from "./components/ViewGrades";
import UpdateGrades from "./components/UpdateGrades";
import AddGrades from "./components/AddGrades";
import { UserAuthContext, UserAuthProvider } from "./utils/UserAuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const PrivateRoutes = () => {
  const { userAuth } = useContext(UserAuthContext);

  if (userAuth === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="viewgrades" element={<ViewGrades />} />
      <Route path="updategrades" element={<UpdateGrades />} />
      <Route path="addgrades" element={<AddGrades />} />
      <Route path="recommendations" element={<ViewRecommendations />} />
      <Route path="entergrades" element={<EnterGrades />} />
    </Routes>
  );
};

const AppContent = () => {
  const { userAuth, updateUserAuth } = useContext(UserAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/checksession",
          { withCredentials: true }
        );
        if (response.data.user) {
          updateUserAuth(response.data.user);
        }
      } catch (error) {
        console.error("Failed to check session", error);
      }
    };

    // Only check session if userAuth is null
    if (userAuth === null) {
      checkSession();
    }
  }, [updateUserAuth, userAuth]);

  return (
    <Routes>
      <Route path="/*" element={<PrivateRoutes />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

function App() {
  return (
    <UserAuthProvider>
      <Header />
      <AppContent />
      <Footer />
    </UserAuthProvider>
  );
}

export default App;
