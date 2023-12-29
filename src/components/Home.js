import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(isLoggedIn ? "/dashboard" : "/login");
  }, [isLoggedIn, navigate]);

  return null;
};

export default Home;
