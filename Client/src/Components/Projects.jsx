import axios from "axios";
import HorizontalNavbar from "./Horizontalnavbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function Projects() {
  const [sampleProjects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const[loader,setLoader]=useState(false)

useEffect(() => {
  const GetAllProjects = async () => {
    try {
      setLoader(true); // Set loader before fetching
      const response = await axios.get("http://localhost:3000/TaskAll/api");
      setProjects(response.data.message); // Update state with project data
      setLoader(false); // Stop loader after response or error
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
    //  finally {
    // }
  };

  GetAllProjects();
}, []);


  const openPopup = (project) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>

      {/* Sidebar */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-20">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Total Projects Card */}
          <div className="flex justify-center mb-8">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-gray-500">Total Projects</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {sampleProjects.length}
                  </p>
                </div>
                <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17v-2a4 4 0 014-4h7m-4-4H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-5z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            📁 Task Overview
          </h1>

          {/* Projects Grid */}

          {loader?<Loader/>:
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project, index) => {
              let badgeColor = "bg-gray-400";
              if (project.status === "Pending") badgeColor = "bg-red-500";
              else if (project.status === "In Progress")
                badgeColor = "bg-yellow-500";
              else if (project.status === "Completed")
                badgeColor = "bg-green-500";

              return (
                <div
                  key={index}
                  className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <span
                    className={`absolute top-4 right-4 text-xs text-white px-2 py-1 rounded-full ${badgeColor}`}
                  >
                    {project.Status}
                  </span>

                  <h2 className="text-xl font-semibold text-blue-700 mb-1">
                    {project.TaskName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Created: {project.createdAt}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Updated: {project.updatedAt}
                  </p>

                  <p className="text-gray-700 text-sm mb-1">
                    {project.TaskDescription}
                  </p>
                  <p className="text-sm text-gray-600">
                    👤 <span className="font-medium">Added by:</span>{" "}
                    {project.Add}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 text-sm rounded hover:bg-indigo-700 transition"
                      onClick={() => openPopup(project)}
                    >
                      More About Task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>}
        </div>
      </main>

      {/* Popup Modal */}
      {selectedProject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={closePopup}
        className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold transition"
        aria-label="Close modal"
      >
        &times;
      </button>

      {/* Modal Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 truncate">
          Task: {selectedProject.TaskName || "Untitled Task"}
        </h2>
      </div>

      {/* Modal Body */}
      <div className="p-6 space-y-4 text-sm text-gray-700">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Description</p>
          <p className="text-gray-800">
            {selectedProject.TaskDescription || <span className="italic text-gray-400">No description provided</span>}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">End Schedule</p>
          <p className="font-medium">
            {selectedProject.EndSchedule
              ? new Date(selectedProject.EndSchedule).toLocaleDateString()
              : "Not set"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Estimated Time</p>
          <p className="font-medium">{selectedProject.EstimatedTime || "N/A"}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Priority</p>
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              selectedProject.Priority === "High"
                ? "bg-red-100 text-red-800"
                : selectedProject.Priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {selectedProject.Priority || "N/A"}
          </span>
        </div>

        {/* 👇 New "Status" Field Added Here */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              selectedProject.Status === "Completed"
                ? "bg-green-100 text-green-800"
                : selectedProject.Status === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {selectedProject.Status || "To Do"}
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Assignee</p>
          <p className="font-medium">{selectedProject.Assignee || "Unassigned"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <p className="uppercase tracking-wider mb-1">Created</p>
            <p>{new Date(selectedProject.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="uppercase tracking-wider mb-1">Updated</p>
            <p>{new Date(selectedProject.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Footer (optional actions) */}
      <div className="flex justify-end px-6 py-3 border-t border-gray-200">
        <button
          onClick={closePopup}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Projects;
