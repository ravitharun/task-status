import React, {  useEffect } from "react";

function Authentication() {
  useEffect(() => {
    // You can replace this with your API call logic
    const token = localStorage.getItem("Token");
    if (token) {
      // setStatus("✅ Authenticated");
      console.log('Authenticated')
    } else {
      window.location("/login")
      // setStatus("❌ Not authenticated");
      console.log(" Not authenticated")
    }
  }, []);

  return (
   <></>
  );
}

export default Authentication;
