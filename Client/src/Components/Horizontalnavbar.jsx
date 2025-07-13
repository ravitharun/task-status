import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

function HorizontalNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [UserInfo, Setuserinfo] = useState({});
  const [Login, setlogin] = useState(false);
  const secretKey = "mySecretKey123"; // keep this secret

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const GetUserinfo = async () => {
      try {
        const storedEmail = localStorage.getItem("useremail");

        if (!storedEmail) {
          console.warn("No useremail found in localStorage");
          return;
        }

        // Decrypt the email
        const decryptedEmail = CryptoJS.AES.decrypt(
          storedEmail,
          secretKey
        ).toString(CryptoJS.enc.Utf8);

        if (!decryptedEmail) {
          console.error("Decryption failed. Email is empty.");
          return;
        }

        // Fetch user info
        const Getresponse = await axios.get(`http://localhost:3000/api/user/`, {
          params: { Email: decryptedEmail },
        });

        // Assuming response looks like { message: { name, email, Profile } }
        Setuserinfo(Getresponse.data.message);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    GetUserinfo();
  }, []);

  // SignOut
  const SignOut = () => {
    try {
      // 🔐 Remove token from localStorage
      localStorage.removeItem("Token");
      setlogin(false);
      // 🚪 Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  localStorage.setItem("Login", Login);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white  hover:text-fuchsia-600">
            TaskNet{" "}
          </span>
        </a>

        {/* Profile and Dropdown */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={
                  UserInfo?.Profile || "https://ui-avatars.com/api/?name=User"
                }
                alt="user"
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 z-50 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {UserInfo?.name || "Name"}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {UserInfo?.email || "Email not available"}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="/login"
                      onClick={SignOut}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HorizontalNavbar;
