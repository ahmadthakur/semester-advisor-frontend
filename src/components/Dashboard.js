import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../utils/UserAuthContext";
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
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import UpdateGrades from "./UpdateGrades";
import AddGrades from "./AddGrades";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const [grades, setGrades] = useState([]);
  const [gradesExist, setGradesExist] = useState(false);
  const [student, setStudent] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentAction, setCurrentAction] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

        const gradesArray = Object.entries(response.data)
          .filter(([name]) => name !== "student_id")
          .map(([name, score]) => {
            return { name, score };
          });

        // Prepare data for the chart
        const chartData = {
          labels: gradesArray.map((grade) => grade.name),
          datasets: [
            {
              data: gradesArray.map((grade) => grade.score),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                // Add more colors if you have more grades
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                // Add more colors if you have more grades
              ],
            },
          ],
        };

        setChartData(chartData);
        setGradesExist(true);
        setGrades(gradesArray);
      } catch (error) {
        console.error("Failed to fetch grades", error);
      }
    };

    fetchStudentInfo();
    fetchGrades();
  }, [refreshKey]);

  const handleGoToRecommendations = () => {
    navigate("/recommendations");
  };

  const handleClose = () => {
    setRefreshKey((oldKey) => oldKey + 1); // increment the key to trigger a re-render
    onClose();
  };

  // Replace all instances of onClose with handleClose

  return (
    <Box key={refreshKey} minH="100vh" py={12} px={{ base: 4, lg: 8 }}>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Box maxW="md" mx="auto">
          <Box py={8} px={4}>
            <p>Welcome to your dashboard!</p>

            {student && (
              <VStack align="start" spacing={2} my={4}>
                <Heading size="md" fontWeight="normal">
                  Student Information
                </Heading>
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

            <Divider my={6} />

            <Heading size="md" mb={4} fontWeight="normal">
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

            <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay />
              <ModalContent>
                {currentAction === "add" ? (
                  <AddGrades
                    setRefreshKey={setRefreshKey}
                    onClose={handleClose}
                  />
                ) : (
                  <UpdateGrades
                    setRefreshKey={setRefreshKey}
                    onClose={handleClose}
                  />
                )}
              </ModalContent>
            </Modal>

            <Divider my={6} />

            <Stack direction="row" spacing={4} mt={6}>
              <Button
                onClick={() => {
                  setCurrentAction(gradesExist ? "update" : "add");
                  onOpen();
                }}
                variant="outline"
                colorScheme="blue"
                width="full"
              >
                {gradesExist ? "Update Grades" : "Add Grades"}
              </Button>

              <Button
                onClick={handleGoToRecommendations}
                variant="outline"
                colorScheme="blue"
                width="full"
              >
                Recommendations
              </Button>
            </Stack>
          </Box>
        </Box>
        {chartData && (
          <Box maxW="md" mx="auto" py={8} px={4}>
            <Doughnut
              data={chartData}
              options={{
                maintainAspectRatio: true,
                cutout: "60%", // Adjust this value to make the doughnut itself bigger or smaller
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 10, // Adjust this value to make the legend labels bigger or smaller
                      },
                    },
                  },
                },
              }}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Dashboard;
