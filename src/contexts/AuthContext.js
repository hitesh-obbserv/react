import React, { createContext, useState } from "react";

import {
  signIn as signInApi,
  register as registerApi,
  validate,
} from "../apis";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const signIn = async (username, password, callback) => {
    setLoading(true);
    const response = await signInApi(username, password);
    if (response && response["access_token"]) {
      localStorage.setItem("token", response["access_token"]);
      setToken(response["access_token"]);
      const json_data = await validate(response["access_token"]);
      localStorage.setItem("mode", json_data["mode"]);
      localStorage.setItem("data", JSON.stringify(json_data));
      setMode(json_data["mode"]);
      if (mode === "admin") {
        callback("/clients");
      }
      if (mode === "user") {
        callback("/register");
      }
    }
    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setMode("");
  };

  const register = async (username, password, callback) => {
    setLoading(true);
    const response = registerApi(username, password);
    if (response && response.id) {
      callback();
    }
    setLoading(false);
  };
  const value = {
    token,
    mode,
    loading,
    signIn,
    signOut,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
