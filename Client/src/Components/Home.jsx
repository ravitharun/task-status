import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";
import Popup from "reactjs-popup";
import { FaBold, FaItalic, FaListUl, FaListOl, FaLink } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CryptoJS from "crypto-js";
import { socket } from "./socket";
import QuickNavigation from "./QuickNavigation";
import Authentication from "./Auth/Authentication";
function Home() {
  const popupRef = useRef(); // to control popup
  const [TaskName, SettaskName] = useState("");
  const [TaskDescription, SetTaskDescription] = useState("");
  const [EstimatedTime, SetEstimatedTime] = useState("");
  const [Status, SetStatus] = useState("");
  const [Type, SetType] = useState("");
  const [Assignee, SetAssignee] = useState("");
  const [Schedule, SetSchedule] = useState("");
  const [EndSchedule, SetEndSchedule] = useState("");
  const [Priority, SetPriority] = useState("");
  const [Link, setlink] = useState("");
  const [Task, SetTask] = useState([]); // ✅ this avoids undefined.map

  const [TaskEdit, SetTaskEdit] = useState([]);

  // getting the all Task data from backend

  useEffect(() => {
    socket.on("Taskadded", (payload) => {
      console.log("taskUpdated", payload);
      toast.success(payload.message);

      // ✅ Append new task to existing list
      SetTask((prev) => [...prev, payload.data]);
    });

    const handleDelete = (data) => {
      // Optional: remove task from UI state if you're storing tasks
      SetTask((prev) => prev.filter((task) => task._id !== data.taskId));
    };

    socket.on("taskDeleted", handleDelete);

    return () => {
      socket.off("Taskadded");
    };
  }, []);

  // alert message
  useEffect(() => {
    toast.success("Hello all", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  useEffect(() => {
    const GETTASK = async () => {
      try {
        const task_data = await axios.get("http://localhost:3000/TaskAll/api");
        SetTask(task_data.data.message); // ✅ correct
      } catch (error) {
        console.error("❌ Error fetching tasks", error);
        toast.error("Failed to fetch tasks");
      }
    };

    GETTASK();
  }, []);

  // table heading's
  const Heading = [
    "TaskName",
    "TaskDescription",
    "EstimatedTime",
    "Status",
    "Type",
    "Assignee",
    "Schedule",
    "EndSchedule",
    "TaskaddBY",
    "Priority",
    "Option",
  ];
  let Invited_Email = localStorage.getItem("useremail");
  const secretKey = "mySecretKey123";
  const bytes = CryptoJS.AES.decrypt(Invited_Email, secretKey);

  // Convert bytes to original string
  const Add = bytes.toString(CryptoJS.enc.Utf8);

  // submitting the Task Information to Backend
  const Submit = async () => {
    if (!TaskName || !Type || !Assignee || !Priority || !Schedule) {
      alert("Please fill all the required fields");
      return;
    }

    const payload = {
      TaskName,
      TaskDescription,
      EstimatedTime,
      Status,
      Type,
      Assignee,
      Schedule,
      EndSchedule,
      Priority,
      Add,
      Link,
    };
    console.log(payload);
    try {
      if (TaskEdit?._id) {
        // Editing existing task
        await axios.put(
          `http://localhost:3000/api/task/update/${TaskEdit._id}`,
          payload
        );
        toast.success("Task updated successfully!");
      } else {
        // Creating new task and sending the data to server
        await axios.post("http://localhost:3000/task/api/Data", {
          data: payload,
        });
      }
      // Refresh task list
      const updated = await axios.get("http://localhost:3000/TaskAll/api");
      SetTask(updated.data.message);
      // Reset form
      SettaskName("");
      SetTaskDescription("");
      SetEstimatedTime("");
      SetStatus("");
      SetType("");
      SetAssignee("");
      SetSchedule("");
      SetEndSchedule("");
      SetPriority("");
      setlink("");
      SetTaskEdit(null);
    } catch (error) {
      console.error("Error in submit:", error);
      toast.error("Failed to submit task.");
    }
  };

  // Attaching the Link in the TextField
  const AttachLink = (event) => {
    event.preventDefault();
    let link = prompt("Please enter the link you want to attach:");
    setlink(link);
  };
  // checking the Active task here
  let Active_task = 11;
  // sending the id to backend to remove the task
  const RemoveTask = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/task/Remove",
        {
          params: { id: id }, // ✅ ensure id is passed as an object
        }
      );
      console.log(response.data.message);
      if (response.data.message == response.data.message) {
        location.reload();
      }
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data || error.message
      );
    }
  };
  // Edit tht data
  const HandelData = async (id) => {
    const response = await axios.put("http://localhost:3000/api/Task/edit", {
      id,
    });
    const task = response.data.message;
    SetTaskEdit(task);

    SettaskName(task.TaskName);
    SetTaskDescription(task.TaskDescription);
    SetEstimatedTime(task.EstimatedTime);
    SetStatus(task.Status);
    SetType(task.Type);
    SetAssignee(task.Assignee);
    SetSchedule(task.Schedule);
    SetEndSchedule(task.EndSchedule);
    SetPriority(task.Priority);
    setlink(task.Link || "");
    popupRef.current.open();
  };
  // ✅ Check if the user is logged in by verifying the token

  // jsx code HTML
  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>
      <Authentication></Authentication>
      {/* Layout with Sidebar */}
      <div className="flex flex-1 pt-16">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64 p- sticky top-16 overflow-y-auto">
          <QuickNavigation />
          <Popup
            className="bg-black"
            ref={popupRef}
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

                  <form
                    className="grid md:grid-cols-2 gap-8"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") Submit();
                    }}
                  >
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
                          value={Link ? Link : TaskDescription}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        ></textarea>

                        <div className="flex gap-3 flex-wrap mt-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                            <FaListUl /> List
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                            <FaListOl /> 123
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                            onClick={AttachLink}
                          >
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
                      <ToastContainer />

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
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          End Schedule
                        </label>
                        <input
                          type="datetime-local"
                          onChange={() => SetEndSchedule(event.target.value)}
                          value={EndSchedule}
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
                        }).then((result) => {
                          console.log(result);
                          if (result.isConfirmed) {
                            close();
                          }
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
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                📋 Active Tasks
                {Active_task.length > 5 && (
                  <span className="ml-3 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full border border-red-200">
                    ⚠️ Complete all active tasks! ({Active_task.length})
                  </span>
                )}
              </h2>
              <div className="bg-red-300 cursor-pointer border w-8 h-8 flex justify-center items-center rounded">
                <IoIosAdd
                  size={24}
                  onClick={() => alert("adding soon  more things")}
                />
              </div>{" "}
            </div>

            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
              <table className="min-w-[1000px] w-full text-sm table-auto border-collapse">
                {/* Table Header */}
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    {Heading.map((data, id) => (
                      <th
                        key={id}
                        className="px-4 py-3 text-left whitespace-nowrap font-semibold"
                      >
                        {data}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-gray-800 divide-y divide-gray-200">
                  {Task.map((data, id) => (
                    <tr key={id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">{data.TaskName}</td>
                      <td className="px-4 py-3">{data.TaskDescription}</td>
                      <td className="px-4 py-3">{data.EstimatedTime}</td>

                      {/* Status with color */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white ${
                            data.Status === "Completed"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        >
                          {data.Status}
                        </span>
                      </td>

                      <td className="px-4 py-3">{data.Type}</td>
                      <td className="px-4 py-3">{data.Assignee}</td>
                      <td className="px-4 py-3">{data.Schedule}</td>
                      <td className="px-4 py-3">{data.EndSchedule}</td>
                      <td className="px-4 py-3">{data.Add}</td>
                      <td className="px-4 py-3">{data.Priority}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium px-4 py-1 rounded shadow-sm transition duration-200"
                            onClick={() => HandelData(data._id)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-4 py-1 rounded shadow-sm transition duration-200"
                            onClick={() => RemoveTask(data._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
            <b className="text-green-500"> </b>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
