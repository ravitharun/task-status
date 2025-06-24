import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home.jsx";
import Login from "./Components/Auth/Login.jsx";
import Calendar from "./Components/Calendar.jsx"; // ✅ fixed
import Signup from "./Components/Auth/sigup.jsx";
import Team from "./Components/Team.jsx";
import Acceptinvite from "./Components/Acceptinvite.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/Calendar" element={<Calendar />} />
      <Route path="/team" element={<Team />} />
      <Route path="/login" element={<Login />} />
      <Route path="/accept-invite" element={<Acceptinvite />} />
      <Route path="/CreateAccount" element={<Signup />} />
    </Routes>
  </Router>
);
