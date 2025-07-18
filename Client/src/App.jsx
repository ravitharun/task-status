import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // ✅ No 'Router' here
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
import Dashboard from "./Components/Dashboard.jsx";
import { userEmail } from "./Components/Email.js";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleIssueAdded = (data) => toast.success(data.message);
    const handleTaskAdded = (data) => toast.success(data.message);
    const handleAcceptInvite = (data) => toast.success(data.message);
    const handleCheckUserTeam = (data) => toast.warning(data.message);
    const handleIssueUpdated = (data) => {
      toast.info(data.message);
      navigate("/reports");
    };
    const handleIssueDeleted = (data) => toast.error(data.message);
    const handleTotalTeam = (data) => toast.info(data.message);

    const handleStatusChange = (data) => {
      console.log(`User ${data.email} is ${data.status}`);
      toast.info(`User ${data.email} is ${data.status}`);
    };
    socket.emit("status", { st: navigator.onLine }); // Emit initial status

    // Socket event listeners
    socket.on("issueAdded", handleIssueAdded);
    socket.on("Taskadded", handleTaskAdded);
    socket.on("AcceptInvite", handleAcceptInvite);
    socket.on("CheckUSerTeam", handleCheckUserTeam);
    socket.on("issueUpdated", handleIssueUpdated);
    socket.on("issueDeleted", handleIssueDeleted);
    socket.on("TotalTeam", handleTotalTeam);
  
    socket.on("userStatusChange", handleStatusChange);
    socket.on("RemoveTeamMember", (data) => {
      toast.info("Team member removed:", data.message);
    });


    socket.on("connect", () => {
      console.log("🔌 Connected to socket:", socket.id);

      socket.emit("status", { st: navigator.onLine }); // Optional
      if (userEmail) {
        socket.emit("userOnline", userEmail); // Main update
      }
    });

    // Listen to user status changes
    socket.on("userStatusChange", ({ email, status }) => {
      toast.info(`${email} is now ${status}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    });

    // Cleanup on unmount
    return () => {
      socket.off("issueAdded", handleIssueAdded);
      socket.off("Taskadded", handleTaskAdded);
      socket.off("AcceptInvite", handleAcceptInvite);
      socket.off("CheckUSerTeam", handleCheckUserTeam);
      socket.off("issueUpdated", handleIssueUpdated);
      socket.off("issueDeleted", handleIssueDeleted);
      socket.off("TotalTeam", handleTotalTeam);
      socket.off("userStatusChange", handleStatusChange);

      socket.disconnect();
    };
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/Calendar" element={<Calendar />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateAccount" element={<Signup />} />
        <Route path="/accept-invite" element={<Acceptinvite />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/task/Notes" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
