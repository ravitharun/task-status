import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ No 'Router' here
import { ToastContainer, toast } from "react-toastify";
import { socket } from "./Components/socket";

// Import your pages
import Home from "./Components/Home.jsx";
import Login from "./Components/Auth/Login.jsx";
import Calendar from "./Components/Calendar.jsx";
import Signup from "./Components/Auth/sigup.jsx";
import Team from "./Components/Team.jsx";
import Acceptinvite from "./Components/Acceptinvite.jsx";
import Projects from "./Components/Projects.jsx";
import Notes from "./Components/Auth/Notes.jsx";
import Reports from "./Components/Reports.jsx";
import "./index.css";

function App() {
  useEffect(() => {
    socket.on("issueAdded", (data) => {
      toast.success(data.message);
    });
    socket.on("Taskadded", (payload) => {
      console.log("taskUpdated", payload);
      toast.success(payload.message);

      // ✅ Append new task to existing list
    });

    return () => {
      socket.off("issueAdded");
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/Calendar" element={<Calendar />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accept-invite" element={<Acceptinvite />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
