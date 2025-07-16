import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [showProjects, setShowProjects] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar toggle

  const handleAddProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, newProject]);
      setNewProject("");
    }
  };

  const ShowProjects = () => setShowProjects((prev) => !prev);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 flex flex-col z-40 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-screen`}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold text-center mb-4">TaskNest</h1>

        {/* Navigation */}
        <div className="space-y-2">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-700">Team Tasks</Link>
          <Link to="/team" className="block px-3 py-2 rounded hover:bg-gray-700">Team</Link>
          <Link to="/projects" className="block px-3 py-2 rounded hover:bg-gray-700">Projects</Link>
          <Link to="/task/Calendar" className="block px-3 py-2 rounded hover:bg-gray-700">Calendar</Link>
          <Link to="/reports" className="block px-3 py-2 rounded hover:bg-gray-700">Reports</Link>
          <Link to="/notes" className="block px-3 py-2 rounded hover:bg-gray-700">Notes</Link>
          <button
            onClick={ShowProjects}
            className="w-full text-left block px-3 py-2 rounded hover:bg-gray-700 hover:text-orange-500 font-mono cursor-pointer"
          >
            <i>Sub Projects</i>
          </button>
        </div>

        <hr className="my-4 border-gray-600" />

        {/* Scrollable Project Section */}
        <div className="flex-1 overflow-y-auto">
          {showProjects && (
            <div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  placeholder="Enter Project"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddProject();
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <button
                  onClick={handleAddProject}
                  className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
                >
                  Add
                </button>
              </div>

              <div className="mt-2">
                {projects.length > 0 ? (
                  projects.map((data, index) => (
                    <p
                      key={index}
                      className="px-3 py-2 rounded hover:bg-gray-700 text-white"
                    >
                      {data}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500 mt-2 italic">No projects found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
