import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [grades, setGrades] = useState([]);
  const [gradesExist, setGradesExist] = useState(false); // Used to determine whether to display "Add Grades" or "Update Grades" button
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/dashboard",
          {
            withCredentials: true,
          }
        );

        // Set the student data
        const { id, username, full_name, email } = response.data;
        setStudent({ id, username, full_name, email });
      } catch (error) {
        console.error("Failed to fetch student info", error);
      }
    };

    const fetchGrades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/grades/view",
          {
            withCredentials: true,
          }
        );

        if (response.data.length > 0) {
          setGradesExist(true);
        }

        // Convert the grades object into an array of objects
        const gradesArray = Object.entries(response.data).map(
          ([name, score]) => {
            return { name, score };
          }
        );
        setGradesExist(true);
        setGrades(gradesArray);
      } catch (error) {
        console.error("Failed to fetch grades", error);
      }
    };

    fetchStudentInfo();
    fetchGrades();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.message) {
        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // Redirect to the login page
        navigate("/login");
      } else {
        console.error("Logout failed on the server-side");
      }
    } catch (error) {
      console.error("Logout request failed", error);
    }
  };

  const handleGoToRecommendations = () => {
    navigate("/recommendations");
  };

  const handleAddOrUpdateGrades = () => {
    navigate(gradesExist ? "/updategrades" : "/addgrades");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>

      {student && (
        <div>
          <h3>Student Information</h3>
          <p>Name: {student.full_name}</p>
          <p>Username: {student.username}</p>
          <p>Email: {student.email}</p>
        </div>
      )}

      <h3>Your Grades</h3>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades &&
            grades.map((grade, index) => {
              if (grade.name === "student_id") return null;
              return (
                <tr key={index}>
                  <td>{grade.name.split(/(?=[A-Z0-9])/).join(" ")}</td>
                  <td>{grade.score}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <button onClick={handleAddOrUpdateGrades}>
        {gradesExist ? "Upadate Grades" : "Add Grades"}
      </button>

      <button onClick={handleGoToRecommendations}>Recommended Courses</button>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
