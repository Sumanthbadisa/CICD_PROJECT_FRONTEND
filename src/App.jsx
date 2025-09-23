import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./COMPONENTS/Login";
import Home from "./COMPONENTS/Home";
import Projects from "./COMPONENTS/Projects";
import Contact from "./COMPONENTS/Contact";
import Navbar from "./COMPONENTS/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
