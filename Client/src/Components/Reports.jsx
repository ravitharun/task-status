import React, { useState } from "react";
import HorizontalNavbar from "./Horizontalnavbar";
import Sidebar from "./Sidebar";
const Reports = () => {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Login Issue",
      description: "Unable to login with correct credentials.",
      project: "TaskNet Redesign",
      assignedTo: "John Doe",
      status: "Open",
    },
  ]);

  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    status: "Open",
  });

  const handleChange = (e) => {
    setNewIssue({ ...newIssue, [e.target.name]: e.target.value });
  };

  const handleAddIssue = () => {
    if (newIssue.title.trim()) {
      setIssues([
        ...issues,
        { ...newIssue, id: Date.now() },
      ]);
      setNewIssue({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        status: "Open",
      });
      setShowForm(false);
    }
  };

  const handleResolve = (id) => {
    const updated = issues.map((issue) =>
      issue.id === id ? { ...issue, status: "Resolved" } : issue
    );
    setIssues(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-amber-50">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>

      {/* Sidebar + Main */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="ml-64 w-full px-4 py-6 sm:px-8">
          

          <div className="max-w-6xl mx-auto mt-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              📝 Reports & Issues
            </h1>

            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {showForm ? "Cancel" : "➕ Add Issue"}
            </button>

            {/* Issue Form */}
            {showForm && (
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Add New Issue
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="title"
                    value={newIssue.title}
                    onChange={handleChange}
                    placeholder="Issue Title"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    name="project"
                    value={newIssue.project}
                    onChange={handleChange}
                    placeholder="Project Name"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <input
                    name="assignedTo"
                    value={newIssue.assignedTo}
                    onChange={handleChange}
                    placeholder="Assigned To"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <select
                    name="status"
                    value={newIssue.status}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md"
                  >
                    <option>Open</option>
                    <option>Resolved</option>
                  </select>
                </div>
                <textarea
                  name="description"
                  value={newIssue.description}
                  onChange={handleChange}
                  placeholder="Issue Description"
                  className="w-full mt-4 border border-gray-300 p-2 rounded-md"
                  rows={3}
                />
                <button
                  onClick={handleAddIssue}
                  className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                >
                  Submit Issue
                </button>
              </div>
            )}

            {/* Issues Table */}
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
                      <td className="px-4 py-3">
                        {issue.status === "Open" && (
                          <button
                            onClick={() => handleResolve(issue.id)}
                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
                          >
                            Mark Resolved
                          </button>
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
