import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../utils/UserAuthContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { updateUserAuth } = useContext(UserAuthContext);

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
      console.log(response.data.user);
      updateUserAuth(response.data.user);
      // handle success

      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      px={{ base: 4, lg: 8 }}
      py={{ base: 24, lg: 24 }}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading mb={6} textAlign="center">
        Sign in to your account
      </Heading>
      <Box maxW="md" mx="auto" my="auto">
        <Box bg="white" py={8} px={4} shadow="lg">
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
          <Text mb={2}>Don't have an account yet?</Text>
          <Button variant="link" onClick={() => navigate("/register")}>
            Register Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
