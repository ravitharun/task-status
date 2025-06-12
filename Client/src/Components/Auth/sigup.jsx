import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function Signup() {
  const [UserName, SetUserName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [ProfileUrl, SetProfile] = useState("");
  const navigate=useNavigate()
  const signInWithGoogle = async () => {
    try {
      // signInWithPopup returns a UserCredential, you might want to use it
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // The signed-in user object
      console.log(
        "Successfully signed in with Google:",
        user.displayName,
        user.email,
        user.photoURL
      );
      SetUserName(user.displayName || "");
      SetEmail(user.email || "");
      SetProfile(user.photoURL);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // const signOut = async () => {
  //   try {
  //     await auth.signOut();
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // };

  const Verify = async (event) => {
    event.preventDefault();
    const data = {
      UserName: UserName,
      Email: Email,
      Password: Password,
      ProfileUrl: ProfileUrl,
    };
    if (Password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!UserName || !Email || !Password) {
      toast.error("Please fill all the fields", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // sending  data to backend
      const response = await axios.post("http://localhost:3000/api/signup", {
        data,
      });
      if (response.data.error == "Email already exists") {
        toast.error(response.data.error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success(response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    }
  };
  const Showpassword = () => {
    const passwordField = document.getElementById("password");
    if (passwordField.type == "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
        <form className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Create an Account
          </h2>
          {/* user image */}
          <div className="flex justify-center mb-4">
            <img
              className="w-24 h-24 rounded-full object-cover" // Added object-cover for better image fitting
              src={ProfileUrl} // Use the state variable for the image source
              alt="User Profile"
            />
          </div>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              onChange={(e) => SetUserName(e.target.value)}
              value={UserName}
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              required
              onChange={(e) => SetEmail(e.target.value)}
              value={Email}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={(e) => SetPassword(e.target.value)}
              value={Password}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id=""
                onClick={Showpassword}
              />
              <label class="form-check-label" for="">
                {" "}
                Show password{" "}
              </label>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={Verify}
          >
            Signup
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            ─ OR ─
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo for sign in"
              className="w-5 h-5"
            />
            <span
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              onClick={signInWithGoogle}
            >
              Continue with Google
            </span>
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
