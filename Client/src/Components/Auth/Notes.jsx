import React from "react";
import HorizontalNavbar from "../Horizontalnavbar";
import Sidebar from "../Sidebar";
import QuickNavigation from "../QuickNavigation";

function Notes() {


  
  return (
    <>
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
          <div>
             <QuickNavigation/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
