import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";
import Popup from "reactjs-popup";
import { FaBold, FaItalic, FaListUl, FaListOl, FaLink } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

function Home() {
  const [TaskName, SettaskName] = useState("");
  const [TaskDescription, SetTaskDescription] = useState("");
  const [EstimatedTime, SetEstimatedTime] = useState("");
  const [Status, SetStatus] = useState("");
  const [Type, SetType] = useState("");
  const [Assignee, SetAssignee] = useState("");
  const [Schedule, SetSchedule] = useState("");
  const [Priority, SetPriority] = useState("");
  const data = {
    TaskName,
    TaskDescription,
    EstimatedTime,
    Status,
    Type,
    Assignee,
    Schedule,
    Priority,
  };
  const Submit = () => {
    if (!TaskName || !Type || !Assignee || !Priority || !Schedule) {
      alert("Please fill all the required fields");
      return;
    }
    console.log("Form submitted with data:", data);
  };
  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>

      {/* Layout with Sidebar */}
      <div className="flex flex-1 pt-16">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64 p- sticky top-16 overflow-y-auto">
          <Popup
            className="bg-black"
            trigger={
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4 ml-3 ">
                Create Task
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
                <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl p-10 mx-4 md:mx-10">
                  <div className="relative p-6">
                    {/* Close Icon in Top Right */}
                    <div className="sticky">
                      <button
                        onClick={close}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 "
                      >
                        <IoMdClose size={24} />
                      </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                      ✨ Create New Task
                    </h2>

                    {/* Your form or content here */}
                  </div>

                  <form className="grid md:grid-cols-2 gap-8">
                    {/* Left Form */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Task Name*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter task name"
                          onChange={() => SettaskName(event.target.value)}
                          value={TaskName}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Task Description
                        </label>
                        <textarea
                          rows="6"
                          placeholder="Describe the task..."
                          onChange={() =>
                            SetTaskDescription(event.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        ></textarea>

                        <div className="flex gap-3 flex-wrap mt-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                            <FaBold /> Bold
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                            <FaItalic /> Italic
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                            <FaListUl /> List
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                            <FaListOl /> 123
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                            <FaLink /> Link
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Form */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Estimated Time
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-lg p-3"
                          onChange={(e) => {
                            SetEstimatedTime(e.target.value);
                          }}
                        >
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>1.5 hours</option>
                          <option value="Custom">
                            <button>Custom</button>
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Status
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-lg p-3"
                          onChange={(event) => {
                            SetStatus(event.target.value);
                          }}
                        >
                          <option className="bg-blue-500  text-white font-mono">
                            New task
                          </option>
                          <option value="In Progress">In Progress</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Type*
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-lg p-3"
                          onChange={() => SetType(event.target.value)}
                        >
                          <option value="Bug">Bug</option>
                          <option value="Operational">Operational</option>
                          <option value="Feature">Feature</option>
                          <option value="TAsk">Task</option>
                          <option value="Improvement">Improvement</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Assignee
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-lg p-3"
                          onChange={() => SetAssignee(event.target.value)}
                        >
                          <option value="User 1">User 1</option>
                          <option value="User 2">User 2</option>
                          <option value="User 3">User 3</option>
                          <option value="User 4">User 4</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Schedule
                        </label>
                        <input
                          type="datetime-local"
                          onChange={() => SetSchedule(event.target.value)}
                          value={Schedule}
                          className="w-full border border-gray-300 rounded-lg p-3"
                        />
                      </div>

                      {/* Priority Dropdown with Icons */}
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          Priority*
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                          onChange={() => SetPriority(event.target.value)}
                        >
                          <option value="critical">🔴 Critical</option>
                          <option value="high">🟠 High</option>
                          <option value="medium">🟡 Medium</option>
                          <option value="low">🟢 Low</option>
                        </select>
                      </div>
                    </div>
                  </form>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-10">
                    <button
                      type="button"
                      onClick={() =>
                        Swal.fire({
                          text: "Do you want to Cancel",
                          confirmButtonText: "Cancel",
                        })
                      }
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!TaskName || !Type || !Assignee || !Priority}
                      onClick={Submit}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition "
                      style={{
                        backgroundColor:
                          !TaskName ||
                          !Type ||
                          !Assignee ||
                          !Priority ||
                          !Schedule
                            ? "#d1d5db"
                            : "#2563eb",
                        cursor:
                          !TaskName ||
                          !Type ||
                          !Assignee ||
                          !Priority ||
                          !Schedule
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Create Task{" "}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>

          <br />
          <div className="w-full overflow-x-auto bg-white shadow-md rounded-xl p-4">
            {/* Heading + Icon in a row */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                📋 Active Tasks <b className="text-gray-400">(0)</b>
              </h2>
              <div className="bg-red-300 cursor-pointer border w-8 h-8 flex justify-center items-center rounded">
                <IoIosAdd
                  size={24}
                  onClick={() => alert("adding soon  more things")}
                />
              </div>{" "}
            </div>

            <div className="min-w-[1000px]">
              <table className="w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Task Details
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Due Date
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Assignee
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Spent Time
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">Redesign Homepage</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    </td>
                    <td className="px-4 py-3">Feature</td>
                    <td className="px-4 py-3">2025-06-20</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">
                      High
                    </td>
                    <td className="px-4 py-3">Ravi</td>
                    <td className="px-4 py-3">2h</td>
                    <td className="px-4 py-3 text-blue-500 cursor-pointer">
                      View
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">Fix Login Bug</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-4 py-3">Bug</td>
                    <td className="px-4 py-3">2025-06-10</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">
                      Low
                    </td>
                    <td className="px-4 py-3">Ankit</td>
                    <td className="px-4 py-3">1.5h</td>
                    <td className="px-4 py-3 text-blue-500 cursor-pointer">
                      View
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      Add Payment Integration
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                        Pending
                      </span>
                    </td>
                    <td className="px-4 py-3">Integration</td>
                    <td className="px-4 py-3">2025-06-25</td>
                    <td className="px-4 py-3 text-yellow-600 font-semibold">
                      Medium
                    </td>
                    <td className="px-4 py-3">Priya</td>
                    <td className="px-4 py-3">3h</td>
                    <td className="px-4 py-3 text-blue-500 cursor-pointer">
                      View
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-center my-6">
            <div className="w-full border-t border-gray-300"></div>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <h2>
            Completed task table applying soon{" "}
            <b className="text-green-500"> (0)</b>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
