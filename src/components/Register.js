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

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
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
        "http://localhost:4000/user/register",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate("/login");
      } else {
        console.error("Registration failed", response.data.message);
      }
    } catch (error) {
      console.error("Registration request failed", error);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={12} px={{ base: 4, lg: 8 }}>
      <Box maxW="md" mx="auto">
        <Box bg="white" py={8} px={4} shadow="lg" rounded={{ sm: "lg" }}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl id="username">
                <FormLabel fontWeight="bold">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl id="fullName">
                <FormLabel fontWeight="bold">Full Name</FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel fontWeight="bold">Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel fontWeight="bold">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Register
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
