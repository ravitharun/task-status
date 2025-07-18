import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const navigate = useNavigate();
  useEffect(() => {
    // You can replace this with your API call logic
    const token = localStorage.getItem("Token");
    if (token) {
      // setStatus("✅ Authenticated");
      console.log("Authenticated");
    } else {
      navigate("/login");
      // setStatus("❌ Not authenticated");
      console.log(" Not authenticated");
    }
  }, []);

  return <></>;
}

export default Authentication;
