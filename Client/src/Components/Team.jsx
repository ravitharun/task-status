import CryptoJS from "crypto-js";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";
import Invite from "./Invite";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { socket } from "./socket";
import Authentication from "./Auth/Authentication";
import { toast } from "react-toastify";
import Loader from "./Loader";

import { userEmail } from "./Email";

function Team() {
  const [Teammember, setTeam] = useState([]);
  const [Load, setLoader] = useState(false);

  useEffect(() => {
    const teamMembers = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `http://localhost:3000/api/Task/Member?userEmail=${userEmail}`
        );
        setTeam(response.data.message);
        // console.log(response.data.message);
      } catch (err) {
        console.log(err, "error");
      } finally {
        setLoader(false);
      }
    };
    teamMembers();
  }, []);

  // to check the totalteam
  useEffect(() => {
    const handleTotalTeam = (TeamMemebr) => {
      setTeam(TeamMemebr.TotalTeam); // Update UI
    };

    socket.on("TotalTeam", handleTotalTeam);

    socket.on("RemoveTeamMember", (data) => {
      toast.info("Team member removed:", data.message);
    });
    return () => {
      socket.off("TotalTeam", handleTotalTeam); // Cleanup
    };
  }, []);

  // Function to remove team member
  const ReomeveTeamMember = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/Task/Member/${id}`
      );
      if (response.status === 200) {
        // Successfully removed team member
        setTeam((prevMembers) =>
          prevMembers.filter((member) => member.id !== id)
        );
        console.log("Team member removed successfully");
      } else {
        console.error("Failed to remove team member");
      }
    } catch (error) {
      console.error("Error removing team member:", error);
    }
  };

  const Status = "offline";
  const Page = "Team";

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>
      <Authentication />
      {/* Sidebar + Main */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar Page={Page} />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            👥 Team Management
          </h2>

          {/* Invite */}
          <Invite />
          <br />
          <br />
          {/* Team Count Card */}
          <div className="w-full sm:max-w-3xl mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 - Total Members */}
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 transition hover:shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                  👥
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Team Members</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Teammember.length}
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-2">
                Last Updated: {new Date().toLocaleString()}
              </div>
            </div>

            {/* Card 2 - Offline Members */}
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 transition hover:shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                  📴
                </div>
                <div>
                  <p className="text-sm text-gray-500">Offline Members</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      Teammember.filter((check) => check.status == "offline")
                        .length
                    }
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-2">
                Updated: {new Date().toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 transition hover:shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                  📴
                </div>
                <div>
                  <p className="text-sm text-gray-500">Online Members</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      Teammember.filter((check) => check.status == "online")
                        .length
                    }
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-2">
                Updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Team Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    invitedBy
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Option
                  </th>
                </tr>
              </thead>
              {Load ? (
                <Loader />
              ) : (
                <tbody className="divide-y divide-gray-100">
                  {Teammember.map((member, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase">
                            {member.Name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-800">
                            {member.Name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${
                            member.members
                          }?subject=Team Invitation&body=${encodeURIComponent(
                            `Hi,\n\nYou are invited to join the team.\nClick the link below to accept the invitation:\nhttp://localhost:5000/accept-invite?email=${member.members}&invited=admin@example.com`
                          )}`}
                          className="text-blue-600 hover:underline"
                        >
                          {member.members}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {(member.role || "employee").charAt(0).toUpperCase() +
                          (member.role || "employee").slice(1).toLowerCase()}
                      </td>

                      <td>
                        <span>
                          {" "}
                          <a
                            href={`mailto:${
                              member.members
                            }?subject=Team Invitation&body=${encodeURIComponent(
                              `Hi,\n\nYou are invited to join the team.\nClick the link below to accept the invitation:\nhttp://localhost:5000/accept-invite?email=${member.members}&invited=admin@example.com`
                            )}`}
                            className="text-blue-600 hover:underline"
                          >
                            {member.invitedBy}
                          </a>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            member.status === "online"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={() => ReomeveTeamMember(member._id)}
                          title="Remove Team Member"
                          style={{ cursor: "pointer" }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
