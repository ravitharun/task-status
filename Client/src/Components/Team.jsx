import CryptoJS from "crypto-js";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";
import Invite from "./Invite";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { socket } from "./socket";
// import { socket } from "./socket";
function Team() {
  const [Teammember, setTeam] = useState([]);
  useEffect(() => {
    const teamMembers = async () => {
      const reponse = await axios.get("http://localhost:3000/api/Task/Member");
      setTeam(reponse.data.data);
      console.log(reponse.data.data, "api call");
    };
    teamMembers();
  }, []);

  // to check the totalteam
  useEffect(() => {
    const handleTotalTeam = (TeamMemebr) => {
      setTeam(TeamMemebr.TotalTeam); // Update UI
      console.log("✅ Updated team received via socket:", TeamMemebr.TotalTeam);
    };

    socket.on("TotalTeam", handleTotalTeam);

    return () => {
      socket.off("TotalTeam", handleTotalTeam); // Cleanup
    };
  }, []);

  const Status = "offline";
  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>

      {/* Sidebar + Main */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            👥 Team Management
          </h2>

          {/* Invite */}
          <Invite />

          {/* Team Count Card */}
          <div className="w-full sm:max-w-md mb-6">
            <div className="flex items-center bg-white shadow rounded-lg p-4 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-semibold mr-4">
                👥
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Team Members</p>
                <p className="text-xl font-bold text-gray-800">
                  {Teammember.length}
                </p>
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
                          Status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {Status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() =>
                          alert(
                            "removing the team member and also send emil to the user"
                          )
                        }
                        title="Remove Team Member"
                        style={{ cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
