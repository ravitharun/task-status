import React, { useEffect, useState } from "react";
import HorizontalNavbar from "./Horizontalnavbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { socket } from "./socket";
import { userEmail } from "./Email";
import Loader from "./Loader";
import { socket } from "./socket";

const Reports = () => {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);
  const [Editting, Setedit] = useState(false);
  const [LoadPage, setLoader] = useState(false);

  useEffect(() => {
    const getIssue = async () => {
      try {
        setLoader(true);
        const response = await axios.get("http://localhost:3000/api/issues");
        setIssues(response.data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    };

    getIssue();
  }, []);

  // websocket connection to fetch existing issues
  useEffect(() => {
    socket.on("issueAdded", (data) => {
      toast.success(data.message);
    });
    socket.on("issueUpdated", (data) => {
      toast.info(data.message);
    });
    // const handelRemovedissue = (data) => {
    //   toast.info(data.message);
    // };

    // socket.on("issueDeleted", handelRemovedissue);
    return () => {
      socket.off("issueAdded");
      socket.off("issueUpdated");
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
      userEmail,
    });

    toast.success(response.data.message);
  };

  const handleResolve = (id) => {
    const updated = issues.map((issue) =>
      issue.id === id ? { ...issue, status: "Resolved" } : issue
    );
    setIssues(updated);
  };

  // const removeIssue Data
  const handleRemoveIssue = async (id) => {
    console.log(id, "id remove");
    try {
      await axios.delete(`http://localhost:3000/api/report/delete/${id}`);
    } catch (error) {
      // toast.error("Error removing issue: " + error.message);
      console.log(error.message, "error.message");
    }
    const updatedIssues = issues.filter((issue) => issue._id !== id);
    setIssues(updatedIssues);
  };

  const handleEditreport = async (id) => {
    console.log(id, "id");
    try {
      const reponse = await axios.get(
        `http://localhost:3000/api/issues/edit/${id}`
      );

      setNewIssue({
        _id: reponse.data.message._id,
        title: reponse.data.message.title,
        description: reponse.data.message.description,
        project: reponse.data.message.project,
        assignedTo: reponse.data.message.assignedTo,
        assignedToEmail: reponse.data.message.assignedToEmail,
        status: reponse.data.message.status,
      });
      setShowForm(true);
      Setedit(true);
    } catch (error) {
      toast.info(error.message, "error from edit report");
    }
  };

  const handleUpdateIssue = async () => {
    if (
      !newIssue.title ||
      !newIssue.description ||
      !newIssue.project ||
      !newIssue.assignedTo
    ) {
      toast.info("Please fill all fields");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/api/issues/edit/${newIssue._id}`,
        {
          title: newIssue.title,
          description: newIssue.description,
          project: newIssue.project,
          assignedTo: newIssue.assignedTo,
          assignedToEmail: newIssue.assignedToEmail,
          status: newIssue.status,
          userEmail: userEmail, // optional if you're tracking user
        }
      );

      setTimeout(() => {
        toast.success(response.data.message);
      }, 3000);
      setShowForm(false);
      Setedit(false);
      setNewIssue({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        assignedToEmail: "",
        status: "Open",
      });
      // Refresh issues after update
      const reponse = await axios.get("http://localhost:3000/api/issues");
      setIssues(reponse.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowForm(false);
      Setedit(false);
      setNewIssue({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        assignedToEmail: "",
        status: "Open",
      });
    }
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
        {/* <Loader /> */}
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
                {!Editting ? (
                  <button
                    onClick={handleAddIssue}
                    className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                  >
                    Submit Issue
                  </button>
                ) : (
                  <button
                    onClick={handleUpdateIssue}
                    className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                  >
                    Edit Issue
                  </button>
                )}
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

                {LoadPage ? (
                  <Loader />
                ) : (
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
                                  onClick={() => handleEditreport(issue._id)}
                                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
                                >
                                  Edit{" "}
                                </button>
                                <button
                                  onClick={() => handleResolve(issue._id)}
                                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-gray-600 transition"
                                >
                                  Mark Resolved
                                </button>
                                <button
                                  onClick={() => handleRemoveIssue(issue._id)}
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
                )}
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
