import React, { useEffect, useState } from "react";
import HorizontalNavbar from "./Horizontalnavbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CryptoJS from "crypto-js";
import { socket } from "./socket";

const Reports = () => {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const getIssue = async () => {
      const reponse = await axios.get("http://localhost:3000/api/issues");
      setIssues(reponse.data.message);
    };
    getIssue();
  }, []);

  // websocket connection to fetch existing issues
  useEffect(() => {
    socket.on("issueAdded", (data) => {
      toast.success(data.message);
    });
    return () => {
      socket.off("issueAdded");
    };
  }, []);

  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    assignedToEmail: "",
    status: "Open",
  });

  const handleChange = (e) => {
    setNewIssue({ ...newIssue, [e.target.name]: e.target.value });
  };

  let Invited_Email = localStorage.getItem("useremail");
  const secretKey = "mySecretKey123";
  const bytes = CryptoJS.AES.decrypt(Invited_Email, secretKey);
  const Add = bytes.toString(CryptoJS.enc.Utf8);

  const handleAddIssue = async () => {
    if (
      !newIssue.title ||
      !newIssue.description ||
      !newIssue.project ||
      !newIssue.assignedTo
    ) {
      toast.info("Please fill all fields");
      return;
    }

    const response = await axios.post("http://localhost:3000/api/issues", {
      newIssue,
      Add,
    });

    socket.emit("issueAdded", {
      newIssue,
      Add,
    });

    toast.success(response.data.message);
  };

  const handleResolve = (id) => {
    const updated = issues.map((issue) =>
      issue.id === id ? { ...issue, status: "Resolved" } : issue
    );
    setIssues(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-amber-50">
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>

      <div className="flex pt-16">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar />
        </div>

        <div className="ml-64 w-full px-4 py-6 sm:px-8">
          <div className="max-w-6xl mx-auto mt-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              📝 Reports & Issues
            </h1>
            <ToastContainer />
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {showForm ? "Cancel" : "➕ Add Issue"}
            </button>

            {showForm && (
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Add New Issue
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" htmlFor="title">
                      Issue Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      value={newIssue.title}
                      onChange={handleChange}
                      placeholder="Enter issue title"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="project">
                      Project Name
                    </label>
                    <input
                      id="project"
                      name="project"
                      value={newIssue.project}
                      onChange={handleChange}
                      placeholder="Project name"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="assignedTo">
                      Assigned To
                    </label>
                    <input
                      id="assignedTo"
                      name="assignedTo"
                      value={newIssue.assignedTo}
                      onChange={handleChange}
                      placeholder="Assigned person name"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm mb-1"
                      htmlFor="assignedToEmail"
                    >
                      Assigned To Email
                    </label>
                    <input
                      id="assignedToEmail"
                      name="assignedToEmail"
                      value={newIssue.assignedToEmail}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="status">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={newIssue.status}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      <option>Open</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm mb-1" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newIssue.description}
                    onChange={handleChange}
                    placeholder="Describe the issue in detail"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    rows={4}
                  />
                </div>
                <button
                  onClick={handleAddIssue}
                  className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                >
                  Submit Issue
                </button>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Reported Issues ({issues.length})
            </h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full text-sm text-left min-w-[600px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Assigned</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Issue By Name</th>
                    <th className="px-4 py-3">Issue By Email</th>
                    {/* <th className="px-4 py-3">Role</th> */}
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr
                      key={issue.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{issue.title}</td>
                      <td className="px-4 py-3">{issue.project}</td>
                      <td className="px-4 py-3">{issue.assignedTo}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            issue.status === "Open"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{issue.Name}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${issue.Add}`}>{issue.Add}</a>
                      </td>
                      {/* <td className="px-4 py-3">{issue.Role}</td> */}
                      <td className="px-4 py-3">
                        {issue.status === "Open" && (
                          <>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleResolve(issue.id)}
                                className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
                              >
                                Edit{" "}
                              </button>
                              <button
                                onClick={() => handleResolve(issue.id)}
                                className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-gray-600 transition"
                              >
                                Mark Resolved
                              </button>
                              <button
                                onClick={() => handleResolve(issue.id)}
                                className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-orange-800 transition"
                              >
                                Remove{" "}
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {issues.length === 0 && (
              <p className="text-gray-500 mt-4">No issues reported yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
