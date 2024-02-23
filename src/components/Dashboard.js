import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Stack,
  Text,
} from "@chakra-ui/react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [grades, setGrades] = useState([]);
  const [gradesExist, setGradesExist] = useState(false);
  const [student, setStudent] = useState(null);

  const getGradeColor = (score) => {
    if (score < 50) return { grade: "F", color: "red.500" };
    if (score < 61) return { grade: "D", color: "orange.500" };
    if (score < 68) return { grade: "C", color: "yellow.500" };
    if (score < 71) return { grade: "B-", color: "yellow.300" };
    if (score < 75) return { grade: "B", color: "green.500" };
    if (score < 80) return { grade: "B+", color: "green.300" };
    if (score < 85) return { grade: "A-", color: "teal.500" };
    if (score < 90) return { grade: "A", color: "blue.500" };
    return { grade: "A+", color: "blue.300" };
  };

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/dashboard",
          {
            withCredentials: true,
          }
        );

        const { id, username, full_name, email } = response.data;
        setStudent({ id, username, full_name, email });
      } catch (error) {
        console.error("Failed to fetch student info", error);
      }
    };

    const fetchGrades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/grades/view",
          {
            withCredentials: true,
          }
        );

        if (response.data.length > 0) {
          setGradesExist(true);
        }

        const gradesArray = Object.entries(response.data).map(
          ([name, score]) => {
            return { name, score };
          }
        );
        setGradesExist(true);
        setGrades(gradesArray);
      } catch (error) {
        console.error("Failed to fetch grades", error);
      }
    };

    fetchStudentInfo();
    fetchGrades();
  }, []);

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

        navigate("/login");
      } else {
        console.error("Logout failed on the server-side");
      }
    } catch (error) {
      console.error("Logout request failed", error);
    }
  };

  const handleGoToRecommendations = () => {
    navigate("/recommendations");
  };

  const handleAddOrUpdateGrades = () => {
    navigate(gradesExist ? "/updategrades" : "/addgrades");
  };

  return (
    <Box bg="gray.50" minH="100vh" py={12} px={{ base: 4, lg: 8 }}>
      <Box maxW="md" mx="auto">
        <Box bg="white" py={8} px={4} shadow="lg" rounded={{ sm: "lg" }}>
          <Heading mb={6}>Dashboard</Heading>
          <p>Welcome to your dashboard!</p>

          {student && (
            <VStack align="start" spacing={2} my={4}>
              <Heading size="md">Student Information</Heading>
              <Flex justify="space-between" w="full">
                <Box>Name:</Box>
                <Box fontWeight="medium">{student.full_name}</Box>
              </Flex>
              <Flex justify="space-between" w="full">
                <Box>Username:</Box>
                <Box fontWeight="medium">{student.username}</Box>
              </Flex>
              <Flex justify="space-between" w="full">
                <Box>Email:</Box>
                <Box fontWeight="medium">{student.email}</Box>
              </Flex>
            </VStack>
          )}

          <Heading size="md" mb={4}>
            Your Grades
          </Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Course</Th>
                <Th>Grade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {grades &&
                grades.map((grade, index) => {
                  if (grade.name === "student_id") return null;
                  const { grade: letterGrade, color } = getGradeColor(
                    grade.score
                  );
                  return (
                    <Tr key={index}>
                      <Td>{grade.name.split(/(?=[A-Z0-9])/).join(" ")}</Td>
                      <Td>
                        {grade.score}{" "}
                        <Text as="span" color={color} fontWeight="bold">
                          ({letterGrade})
                        </Text>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>

          <Stack spacing={4} mt={6}>
            <Button onClick={handleAddOrUpdateGrades} colorScheme="blue">
              {gradesExist ? "Update Grades" : "Add Grades"}
            </Button>

            <Button onClick={handleGoToRecommendations} colorScheme="teal">
              Recommended Courses
            </Button>

            <Button onClick={handleLogout} colorScheme="red">
              Logout
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
