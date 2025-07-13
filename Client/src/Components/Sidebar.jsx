import { useState } from "react";

export default function Sidebar() {
  const [projects, setProjects] = useState(["Demo", "grgrg", "tharun"]);
  const [newProject, setNewProject] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const handleAddProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, newProject]);
      setNewProject("");
      setShowInput(false);
    }
  };
  const ShowProjects = () => {
    if (showProjects) {
      setShowProjects(false);
      return;
    }
    setShowProjects(true);
  };
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <img
          src="https://grupoportfolio.com.br/portfolio-tech/wp-content/uploads/sites/2/2020/09/LOGO-TASK-MANAGER.png"
          alt="Logo"
          className="w-16 h-16 rounded-full"
        />
      </div>

      {/* Navigation Menu */}
      <div className="space-y-2">
        <a href="/" className="block px-3 py-2 rounded hover:bg-gray-700">
          Team Tasks
        </a>
        <a href="/team" className="block px-3 py-2 rounded hover:bg-gray-700">
          Team
        </a>
        <a
          href="/projects"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Projects
        </a>
        <a
          href="/task/Calendar"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Calendar
        </a>
        <a
          href="/reports"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Reports
        </a>
        <a
          onClick={ShowProjects}
          className="block px-3 py-2 rounded hover:bg-gray-700 hover:text-orange-500 font-mono cursor-pointer"
        >
          <i> Sub Projects</i>{" "}
        </a>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-600" />

      {/* Projects Section */}

      {
        <div style={{ display: showProjects == true ? "block" : "none" }}>
          Adding soon Here Sub Projects File
        </div>
      }
    </div>
  );
}
