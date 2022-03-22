import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Places from "../pages/Places";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../contexts/AuthContext";
import Register from "../pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/clients" element={<PrivateRoute />}>
            <Route exact path="/clients" element={<Places />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
