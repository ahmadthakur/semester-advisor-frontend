// src/components/EnterGrades.js
import React, { useState } from "react";
import axios from "axios";

const EnterGrades = () => {
  const [grades, setGrades] = useState({
    ProgrammingFundamentals: 0,
    IntroductionToComputing: 0,
    Calculus1: 0,
  });

  const handleChange = (e) => {
    setGrades({ ...grades, [e.target.name]: parseInt(e.target.value, 10) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/grades",
        grades
      );
      console.log(response.data); // handle success or redirect to view grades
    } catch (error) {
      console.error("Failed to submit grades", error);
    }
  };

  return (
    <div>
      <h2>Enter Grades</h2>
      <form onSubmit={handleSubmit}>
        <label>Programming Fundamentals:</label>
        <input
          type="number"
          name="ProgrammingFundamentals"
          value={grades.ProgrammingFundamentals}
          onChange={handleChange}
        />

        <label>Introduction to Computing:</label>
        <input
          type="number"
          name="IntroductionToComputing"
          value={grades.IntroductionToComputing}
          onChange={handleChange}
        />

        <label>Calculus 1:</label>
        <input
          type="number"
          name="Calculus1"
          value={grades.Calculus1}
          onChange={handleChange}
        />

        <button type="submit">Submit Grades</button>
      </form>
    </div>
  );
};

export default EnterGrades;
