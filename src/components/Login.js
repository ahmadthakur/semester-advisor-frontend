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

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
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
        "http://localhost:4000/user/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data); // handle success

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
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
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel fontWeight="bold">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Login
              </Button>
            </VStack>
          </form>
        </Box>
        <Box mt={6} textAlign="center">
          <Button variant="link" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
