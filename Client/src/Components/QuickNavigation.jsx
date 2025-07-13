import React from 'react'

function QuickNavigation() {
  return (
    <>
    
    
    <div className="flex-1 ml-64 p- sticky top-16 overflow-y-auto">
          <a href="/task/Calendar">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-300 hover:text-black transition mt-4 ml-3 ">
              Calendar
            </button>
          </a>
          <a href="/task/Notes">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-300 hover:text-black transition mt-4 ml-3 ">
              Notes
            </button>
          </a>
          </div>
    </>
  )
}

export default QuickNavigation