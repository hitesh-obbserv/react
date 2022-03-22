import React, { useContext, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./frame.css";
const Home = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const getData = () => {
    const getDataLocal = localStorage.getItem("data");
    if (getDataLocal) {
      return JSON.parse(getDataLocal);
    } else {
      return {};
    }
  };
  const data = getData();
  useEffect(() => {
    if (auth.token) {
      if (auth.mode === "admin") {
        navigate("/clients");
      }
    }
    if (!auth.token) {
      navigate("/login");
    }
  }, []);
  return (
    <MainLayout>
      <div
        dangerouslySetInnerHTML={{ __html: data["iframe"] }}
        style={{ height: "100%" }}
      />
    </MainLayout>
  );
};

export default Home;
