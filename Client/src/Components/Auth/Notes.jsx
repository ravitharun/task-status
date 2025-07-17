import React from "react";
import HorizontalNavbar from "../Horizontalnavbar";
import Sidebar from "../Sidebar";
import NotesEditor from "../ToDoList";

function Notes() {
  return (
    <>
      <div className="flex flex-col h-screen bg-amber-50">
        <div className="fixed top-0 left-0 right-0 z-10">
          <HorizontalNavbar />
        </div>

        <div className="flex flex-1 pt-16">
          <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
            <Sidebar />
          </div>

          <div className="ml-64 flex-1 p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">🗂 Project Notes</h1>
            <NotesEditor />
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
