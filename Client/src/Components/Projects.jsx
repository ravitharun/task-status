import React from "react";
import HorizontalNavbar from "./Horizontalnavbar";
import Sidebar from "./Sidebar";

function Projects() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <HorizontalNavbar />
      </div>

      {/* Sidebar + Main */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Projects;
