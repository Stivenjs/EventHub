import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Login } from "./Login";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
};
