import React, { useState } from "react";
import Popup from "reactjs-popup";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useEffect } from "react";
import { socket } from "./socket";
import { toast } from "react-toastify";
function Invite() {
  const [Email, Setemail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const reponseemail = () => {
      socket.on("AcceptInvite", (dataMessage) => {
        toast.success(dataMessage.message);
      });
      socket.on("CheckUSerTeam", (dataMessage) => {
        toast.info(dataMessage.message);
      });
    };
    reponseemail();
  }, []);

  const Sendinvite = async (e) => {
    // calling api here
    const Invited_Email = localStorage.getItem("useremail");

    const secretKey = "mySecretKey123";
    const bytes = CryptoJS.AES.decrypt(Invited_Email, secretKey);

    // Convert bytes to original string
    const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);

    console.log("encryptedEmail", decryptedEmail);
    e.preventDefault();
    if (!Email) {
      alert("Please enter an email address.");
      return;
    }
    const response_email = await axios.post(
      "http://localhost:3000/api/taskadd/email",
      { Email, decryptedEmail }
    );
    console.log(response_email.data.message);
    if (response_email.data.message == "No user found !") {
      alert("No user found !");
      navigate("/login");
    } else {
      alert(response_email.data.message);
    }
  };

  return (
    <>
      <Popup
        trigger={
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            ➕ Invite Member
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={close}
              >
                <IoMdClose size={22} />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                Invite a Team Member
              </h2>

              {/* Form */}
              <form className="space-y-4">
                <input
                  type="email"
                  required
                  value={Email}
                  placeholder="Enter email address"
                  onChange={(e) => Setemail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                />

                <button
                  type="submit"
                  onClick={Sendinvite}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Send Invitation
                </button>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

export default Invite;
