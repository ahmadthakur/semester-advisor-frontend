// src/components/ViewRecommendations.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/recommendation",
          {
            withCredentials: true,
          }
        );
        setRecommendations(response.data);
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Predicted Success Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((recommendation, index) => (
            <tr key={index}>
              <td>{recommendation[0].split(/(?=[A-Z0-9])/).join(" ")}</td>
              <td>{Math.round(recommendation[1] * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRecommendations;
