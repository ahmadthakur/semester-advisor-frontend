import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGrades = () => {
  const [grades, setGrades] = useState({
    ProgrammingFundamentals: "",
    IntroductionToComputing: "",
    Calculus1: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setGrades({ ...grades, [e.target.name]: parseInt(e.target.value, 10) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/grades",
        grades,
        { withCredentials: true }
      );
      if (response.data.message) {
        navigate("/dashboard");
      } else {
        console.error("Failed to add grades", response.data.message);
      }
    } catch (error) {
      console.error("Request to add grades failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="ProgrammingFundamentals"
        placeholder="Programming Fundamentals grade"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="IntroductionToComputing"
        placeholder="Introduction To Computing grade"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="Calculus1"
        placeholder="Calculus 1 grade"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Grades</button>
    </form>
  );
};

export default AddGrades;
