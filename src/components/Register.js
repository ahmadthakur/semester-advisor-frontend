import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineIdcard,
} from "react-icons/ai";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

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

      navigate("/login");

      // Show success toast
      toast({
        title: "Registration successful.",
        description: "You can now login.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      console.error("Registration failed", response.data.message);
    } catch (error) {
      console.error("Registration request failed", error);

      // Show error toast
      toast({
        title: "Registration failed.",
        description: "Please check your details and try again.",
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
    >
      <Heading mb={6} textAlign="center" fontWeight="normal">
        Get Started
      </Heading>
      <Box maxW="md" mx="auto">
        <Divider mb={6} />
      </Box>
      <Box maxW="md" mx="auto">
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
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineIdcard color="gray.300" />}
                />
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineMail color="gray.300" />}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
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
                  onChange={handleChange}
                  required
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
                Register
              </Button>
            </VStack>
          </form>
        </Box>
        <Box mt={6} textAlign="center">
          <Text mb={2}>Already have an account?</Text>
          <Button
            variant="link"
            color="blue.500"
            onClick={() => navigate("/login")}
          >
            Login Here
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
