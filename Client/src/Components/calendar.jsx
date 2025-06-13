import React from "react";
import Sidebar from "./Sidebar";
import HorizontalNavbar from "./Horizontalnavbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Required default styles

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const events = [
    {
      title: " Team Meeting",
      type: "meeting",
      start: new Date(2025, 5, 13, 10, 0), // June 13, 2025 - 10:00 AM
      end: new Date(2025, 5, 13, 11, 0),
    },
    {
      title: " Launch Review",
      type: "review",
      start: new Date(2025, 5, 14, 14, 0),
      end: new Date(2025, 5, 14, 15, 30),
    },
  ];

  console.log(localizer);
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>

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
          <a href="/">
            {" "}
            <button className="px-6 py-2 bg-blue-600 mb-2 text-white rounded-md hover:bg-blue-300 hover:text-black transition mt-4 ml-3 ">
              Task
            </button>
          </a>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              className="bg-white rounded-lg shadow-md"
              defaultView="month"
              components={{
                event: ({ event }) => (
                  <span
                    className="text-sm font-semibold text-black-600"
                    style={{
                      color: event.type === "meeting" ? "emerald " : "#green",
                    }}
                  >
                    <i>
                      {event.type == "meeting" ? "📅" : "🚀"} {event.title}
                    </i>
                  </span>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
