import React from "react";
import {
  Box,
  Heading,
  Flex,
  Icon,
  Image,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuthContext } from "../utils/UserAuthContext";
import logo from "../assets/logo.png";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { userAuth, updateUserAuth } = React.useContext(UserAuthContext);
  const color = useColorModeValue("gray.600", "white");
  const headingDisplay = useBreakpointValue({ base: "none", md: "block" });

  const toast = useToast();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.message) {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // Update userAuth to null
        updateUserAuth(null);

        navigate("/login");

        // Show success toast
        toast({
          title: "Logout successful.",
          description: "You are now logged out.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        console.error("Logout failed on the server-side");

        // Show error toast
        toast({
          title: "Logout failed.",
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Logout request failed", error);

      // Show error toast
      toast({
        title: "Logout failed.",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Box as="header" role="banner" py={4} px={8} color="black">
      <Flex justify="space-between" align="center">
        <Flex>
          <Image src={logo} boxSize="50px" alt="Logo" mr={4} />
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            fontWeight="normal"
            color={color}
            display={headingDisplay}
          >
            Semester Advisor Dashboard
          </Heading>
        </Flex>
        <Flex align="center" justifyContent="space-between">
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />

          {userAuth && (
            <Button
              onClick={handleLogout}
              colorScheme="gray"
              variant="outline"
              leftIcon={<Icon as={FiLogOut} />}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
