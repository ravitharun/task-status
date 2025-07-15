import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ No 'Router' here
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
    const handleIssueAdded = (data) => {
      toast.success(data.message);
    };

    const handleTaskAdded = (payload) => {
      console.log("taskUpdated", payload);
      toast.success(payload.message);
    };

    const handleAcceptInvite = (dataMessage) => {
      toast.success(dataMessage.message);
    };

    const handleCheckUserTeam = (dataMessage) => {
      toast.info(dataMessage.message);
    };

    const handleIssueUpdated = (data) => {
      toast.info(data.message);
      Navigate("/reports");
    };
    const handelRemovedissue = (data) => {
      toast.info(data.message);
    };
    const handelTotalTeam = (data) => {
      toast.info(data.message);
    };

    // Register socket listeners
    socket.on("issueAdded", handleIssueAdded);
    socket.on("Taskadded", handleTaskAdded);
    socket.on("AcceptInvite", handleAcceptInvite);
    socket.on("CheckUSerTeam", handleCheckUserTeam);
    socket.on("issueUpdated", handleIssueUpdated);

    socket.on("issueDeleted", handelRemovedissue);
    socket.on("TotalTeam", handelTotalTeam);
    // Clean up all listeners
    return () => {
      socket.off("issueAdded", handleIssueAdded);
      socket.off("Taskadded", handleTaskAdded);
      socket.off("AcceptInvite", handleAcceptInvite);
      socket.off("issueDeleted", handelRemovedissue);
      socket.off("CheckUSerTeam", handleCheckUserTeam);
      socket.off("issueUpdated", handleIssueUpdated);
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
        <Route path="/CreateAccount" element={<Signup />} />
        <Route path="/accept-invite" element={<Acceptinvite />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
