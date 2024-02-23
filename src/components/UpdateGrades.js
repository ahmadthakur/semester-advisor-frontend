import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const UpdateGrades = () => {
  const [grades, setGrades] = useState({
    IntroductionToComputing: "",
    IntroductionToProgramming: "",
    EnglishComprehension: "",
    CalculusAndAnalyticalGeometry: "",
    Physics: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setGrades({ ...grades, [e.target.name]: parseInt(e.target.value, 10) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/updategrades",
        grades,
        { withCredentials: true }
      );
      if (response.data.message) {
        navigate("/dashboard");
      } else {
        console.error("Failed to update grades", response.data.message);
      }
    } catch (error) {
      console.error("Request to update grades failed", error);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={12} px={{ base: 4, lg: 8 }}>
      <Box maxW="md" mx="auto">
        <Box bg="white" py={8} px={4} shadow="lg" rounded={{ sm: "lg" }}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl id="IntroductionToComputing">
                <FormLabel>Introduction To Computing grade</FormLabel>
                <Input
                  type="number"
                  name="IntroductionToComputing"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="IntroductionToProgramming">
                <FormLabel>Introduction To Programming grade</FormLabel>
                <Input
                  type="number"
                  name="IntroductionToProgramming"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="EnglishComprehension">
                <FormLabel>English Comprehension grade</FormLabel>
                <Input
                  type="number"
                  name="EnglishComprehension"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="CalculusAndAnalyticalGeometry">
                <FormLabel>Calculus And Analytical Geometry grade</FormLabel>
                <Input
                  type="number"
                  name="CalculusAndAnalyticalGeometry"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="Physics">
                <FormLabel>Physics grade</FormLabel>
                <Input type="number" name="Physics" onChange={handleChange} />
              </FormControl>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Update Grades
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateGrades;
