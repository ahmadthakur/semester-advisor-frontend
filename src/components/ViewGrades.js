import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewGrades = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/grades/view",
          {
            withCredentials: true,
          }
        );
        setGrades(response.data);
      } catch (error) {
        console.error("Failed to fetch grades", error);
        console.log(error.response.data);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div>
      <h2>View Grades</h2>
      <ul>
        {grades.map((course, index) => (
          <li key={index}>
            {course.name}: {course.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewGrades;
