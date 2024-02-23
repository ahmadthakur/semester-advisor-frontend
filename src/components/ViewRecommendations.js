import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

const ViewRecommendations = () => {
  const [recommendations, setRecommendations] = useState({});

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

  const formatSemesterName = (name) => {
    const nameParts = name.match(/[A-Za-z]+|[0-9]+/g);
    if (nameParts) {
      return `${nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)} ${
        nameParts[1]
      }`;
    }
    return name;
  };

  return (
    <Box bg="gray.50" minH="100vh" py={12} px={{ base: 4, lg: 8 }}>
      <Box maxW="md" mx="auto">
        <Box bg="white" py={8} px={4} shadow="lg" rounded={{ sm: "lg" }}>
          <Heading mb={6}>Recommendations</Heading>
          {Object.entries(recommendations).map(([semester, courses], index) => (
            <Box
              bg="gray.100"
              p={4}
              mt={4}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              key={index}
            >
              <VStack align="start" spacing={6}>
                <Heading size="md">{formatSemesterName(semester)}</Heading>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Course</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {courses.map((course, index) => (
                      <Tr key={index}>
                        <Td>{course.split(/(?=[A-Z0-9])/).join(" ")}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewRecommendations;
