import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import {App} from './App'

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/App" element={<App />} />
      </Routes>
    </>
  );
};
