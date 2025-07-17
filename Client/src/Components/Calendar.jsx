import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Required default styles
import axios from "axios";
import Authentication from "./Auth/Authentication";
import QuickNavigation from "./QuickNavigation";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [Events, seEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const GetallTask = async () => {
      try {
        const response = await axios.get("http://localhost:3000/TaskAll/api");
        seEvents(response.data.message);
      } catch (err) {
        console.log(err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    GetallTask();
  }, []);

  const calendarEvents = Events.map((data) => ({
    title: data.TaskName,
    type: data.Type,
    start: new Date(data.Schedule), // Example: June 13, 14, 15...
    end: new Date(data.EndSchedule),
  }));

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>
      <Authentication />
      {/* Sidebar */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📅 Calendar View
          </h2>

          <div className="">
            <QuickNavigation />
          </div>
          {loading ? (
            <p className="text-center text-gray-600">Loading tasks...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                className="bg-gray-200 rounded-lg shadow-md"
                defaultView="month"
                components={{
                  event: ({ event }) => (
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: event.type === "meeting" ? "red" : "indigo", // green / blue
                        fontFamily: "inherit",
                      }}
                    >
                      <i>
                        {event.type === "meeting" ? "📅" : "🚀"} {event.title}
                      </i>
                    </span>
                  ),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
