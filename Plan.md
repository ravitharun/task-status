import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";
import Popup from "reactjs-popup";
import { FaBold, FaItalic, FaListUl, FaListOl, FaLink } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { socket } from "./socket";

function Home() {
  const popupRef = useRef();

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
  const [Task, SetTask] = useState([]);
  const [TaskEdit, SetTaskEdit] = useState(null);

  useEffect(() => {
    socket.on("Taskadded", (payload) => {
      toast.success(payload.message);
      SetTask((prev) => [...prev, payload.data]);
    });

    return () => {
      socket.off("Taskadded");
    };
  }, []);

  useEffect(() => {
    const GETTASK = async () => {
      toast.success("Hello all", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
      });

      try {
        const task_data = await axios.get("http://localhost:3000/TaskAll/api");
        SetTask(task_data.data.message);
      } catch (error) {
        console.error("❌ Error fetching tasks", error);
        toast.error("Failed to fetch tasks");
      }
    };

    GETTASK();
  }, []);

  const Heading = [
    "TaskName",
    "TaskDescription",
    "EstimatedTime",
    "Status",
    "Type",
    "Assignee",
    "Schedule",
    "EndSchedule",
    "Priority",
    "Option",
  ];

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
      Link,
    };

    try {
      if (TaskEdit?._id) {
        await axios.put(
          `http://localhost:3000/api/task/update/${TaskEdit._id}`,
          payload
        );
        toast.success("Task updated successfully!");
      } else {
        await axios.post("http://localhost:3000/task/api/Data", {
          data: payload,
        });
      }

      const updated = await axios.get("http://localhost:3000/TaskAll/api");
      SetTask(updated.data.message);

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

  const AttachLink = (event) => {
    event.preventDefault();
    let link = prompt("Please enter the link you want to attach:");
    setlink(link);
  };

  const RemoveTask = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/task/Remove",
        {
          params: { id },
        }
      );
      if (response.data.message) {
        location.reload();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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

  let Active_task = Task.filter((data) => data.Status !== "Completed");

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>
      <div className="flex flex-1 pt-16">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar />
        </div>
        <div className="flex-1 ml-64 p-4 overflow-y-auto">
          <Popup
            ref={popupRef}
            trigger={
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4 ml-3">
                Create Task
              </button>
            }
            modal
            nested
          >
            {/* your popup form code stays unchanged */}
          </Popup>

          <div className="w-full overflow-x-auto bg-white shadow-md rounded-xl p-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                📋 Active Tasks
                {Active_task.length > 5 && (
                  <span className="ml-3 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full border border-red-200">
                    ⚠️ Complete all active tasks! ({Active_task.length})
                  </span>
                )}
              </h2>
            </div>

            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
              <table className="min-w-[1000px] w-full text-sm table-auto border-collapse">
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
                <tbody className="text-gray-800 divide-y divide-gray-200">
                  {Array.isArray(Task) &&
                    Task.map((data, id) => (
                      <tr key={id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">{data.TaskName}</td>
                        <td className="px-4 py-3">{data.TaskDescription}</td>
                        <td className="px-4 py-3">{data.EstimatedTime}</td>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
