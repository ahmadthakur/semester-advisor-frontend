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
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const AddGrades = ({ onClose, setRefreshKey }) => {
  const [grades, setGrades] = useState({
    IntroductionToComputing: "",
    IntroductionToProgramming: "",
    EnglishComprehension: "",
    CalculusAndAnalyticalGeometry: "",
    Physics: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const color = useColorModeValue("gray.600", "white");

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

        // Show success toast
        toast({
          title: "Grades added successfully.",
          description: "Your grades have been updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        console.error("Failed to add grades", response.data.message);

        // Show error toast
        toast({
          title: "Failed to add grades.",
          description: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Request to add grades failed", error);

      // Show error toast
      toast({
        title: "Failed to add grades.",
        description: "Please check your details and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    setRefreshKey((oldKey) => oldKey + 1);
    onClose();
  };
  return (
    <Box py={8} px={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl id="IntroductionToComputing">
            <FormLabel color={color}>Introduction To Computing grade</FormLabel>
            <Input
              type="number"
              name="IntroductionToComputing"
              onChange={handleChange}
              min={0}
              max={100}
            />
          </FormControl>
          <FormControl id="IntroductionToProgramming">
            <FormLabel color={color}>
              Introduction To Programming grade
            </FormLabel>
            <Input
              type="number"
              name="IntroductionToProgramming"
              onChange={handleChange}
              min={0}
              max={100}
            />
          </FormControl>
          <FormControl id="EnglishComprehension">
            <FormLabel color={color}>English Comprehension grade</FormLabel>
            <Input
              type="number"
              name="EnglishComprehension"
              onChange={handleChange}
              min={0}
              max={100}
            />
          </FormControl>
          <FormControl id="CalculusAndAnalyticalGeometry">
            <FormLabel color={color}>
              Calculus And Analytical Geometry grade
            </FormLabel>
            <Input
              type="number"
              name="CalculusAndAnalyticalGeometry"
              onChange={handleChange}
              min={0}
              max={100}
            />
          </FormControl>
          <FormControl id="Physics">
            <FormLabel color={color}>Physics grade</FormLabel>
            <Input
              type="number"
              name="Physics"
              onChange={handleChange}
              min={0}
              max={100}
            />
          </FormControl>
          <HStack spacing={4}>
            <Button
              leftIcon={<CheckIcon />}
              variant="outline"
              colorScheme="green"
              size="lg"
              fontSize="md"
              type="submit"
              width="full"
            >
              Add Grades
            </Button>
            <Button
              leftIcon={<CloseIcon />}
              variant="outline"
              colorScheme="red"
              size="lg"
              fontSize="md"
              onClick={onClose}
              width="full"
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddGrades;
