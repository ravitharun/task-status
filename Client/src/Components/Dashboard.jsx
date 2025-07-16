// Dashboard.jsx
import {
  FaTasks,
  FaProjectDiagram,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";

export default function Dashboard() {
  const projects = {
    total: 10,
    completed: 6,
    pending: 3,
    upcoming: 1,
  };

  const cards = [
    {
      icon: <FaProjectDiagram />,
      label: "Total Projects",
      value: projects.total,
      color: "bg-blue-500",
    },
    {
      icon: <FaCheckCircle />,
      label: "Completed",
      value: projects.completed,
      color: "bg-green-500",
    },
    {
      icon: <FaTasks />,
      label: "Pending",
      value: projects.pending,
      color: "bg-yellow-500",
    },
    {
      icon: <FaClock />,
      label: "Upcoming",
      value: projects.upcoming,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
     <div className="w-64">
    <Sidebar />
  </div>

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <HorizontalNavbar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard</h2>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 w-52 rounded-md border border-gray-300 focus:outline-blue-500 shadow-sm"
              />
              <img
                src="https://i.pravatar.cc/150"
                alt="User"
                className="w-10 h-10 rounded-full shadow-md"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`p-5 rounded-xl text-white shadow-lg transform transition duration-300 hover:scale-105 ${card.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{card.icon}</div>
                  <div className="text-right">
                    <p className="text-sm font-light">{card.label}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-10"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              📈 Project Progress Overview
            </h3>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Chart Placeholder – use Chart.js or Recharts here
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              📝 Recent Activity
            </h3>
            <ul className="text-gray-600 space-y-3 text-sm leading-relaxed">
              <li>✅ Completed task <strong>“Setup CI/CD Pipeline”</strong></li>
              <li>🆕 Created project <strong>“Redesign Dashboard UI”</strong></li>
              <li>📌 Assigned task to <strong>Alice</strong></li>
              <li>🔁 Updated status of <strong>“API Integration”</strong></li>
            </ul>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
