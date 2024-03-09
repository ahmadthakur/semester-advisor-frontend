import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      py="6"
      px={{ base: "4", md: "8" }}
      textAlign="center" // Add this line
    >
      <Text fontSize="sm" color="gray.500">
        &copy; {new Date().getFullYear()} Semestor Advisor. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
