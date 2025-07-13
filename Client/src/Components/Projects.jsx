import React from "react";
import HorizontalNavbar from "./Horizontalnavbar";
import Sidebar from "./Sidebar";

function Projects() {
  const sampleProjects = [
    {
      name: "TaskNet Redesign",
      createdAt: "13 July 2025",
      status: "In Progress",
      description: "UI overhaul using Tailwind CSS and React.",
    },
    {
      name: "Team Chat System",
      createdAt: "10 July 2025",
      status: "Completed",
      description: "Real-time chat using Socket.io and Express.",
    },
    {
      name: "API Integration",
      createdAt: "8 July 2025",
      status: "Pending",
      description: "Connect project with external job API.",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
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
        <div className="flex justify-center mb-8">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Projects
                </h3>
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

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📁 Projects Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project, index) => {
            // Define status color
            let badgeColor = "bg-gray-400";
            if (project.status === "Pending") badgeColor = "bg-red-500";
            else if (project.status === "In Progress")
              badgeColor = "bg-yellow-500";
            else if (project.status === "Completed")
              badgeColor = "bg-green-500";

            return (
              <div
                key={index}
                className="relative bg-white p-5 rounded-lg shadow hover:shadow-md transition duration-200"
              >
                {/* Top-right status badge */}
                <span
                  className={`absolute top-3 right-3 text-xs text-white px-2 py-1 rounded-full ${badgeColor}`}
                >
                  {project.status}
                </span>

                <h2 className="text-lg font-semibold text-blue-700">
                  {project.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  📆 {project.createdAt}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {project.description}
                </p>

                <button className="mt-4 inline-block bg-blue-600 text-white px-4 py-1 text-sm rounded hover:bg-blue-700">
                  View Tasks
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Projects;
