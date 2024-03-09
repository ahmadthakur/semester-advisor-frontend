import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../utils/UserAuthContext";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  InputLeftElement,
  InputGroup,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { updateUserAuth } = useContext(UserAuthContext);
  const toast = useToast();

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

      // Show success toast
      toast({
        title: "Login successful.",
        description: "You are now logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Login failed", error);

      // Show error toast
      toast({
        title: "Login failed.",
        description: "Please check your username and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Box
      minH="100vh"
      px={{ base: 4, lg: 8 }}
      py={{ base: 24, lg: 24 }}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading mb={6} textAlign="center" fontWeight="normal">
        Login to Semestor Advisor
      </Heading>
      <Box maxW="md" mx="auto">
        <Divider mb={6} />
      </Box>
      <Box maxW="md" mx="auto" my="auto">
        <Box py={8} px={4}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineUser color="gray.300" />}
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineLock color="gray.300" />}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputGroup>
              <Button
                type="submit"
                variant="outline"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                width="full"
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
        <Box mt={6} textAlign="center">
          <Text mb={2}>Don't have an account yet?</Text>
          <Button
            variant="link"
            color="blue.500"
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
