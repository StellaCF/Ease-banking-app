import React from 'react'
import Sidebar from '../../components/SideBar'

const Setting = () => {
  return (
   <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar/>
      <main>
         <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-8 md:ml-64">
            <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
            <div className="bg-white shadow-md rounded-lg px-6 py-3">
               <button className="text-xl font-semibold">Change Transaction Pin</button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
               <button className="text-xl font-semibold">Delete Account</button>
            </div>
         </div>
      </main>
    </div>
  )
}

export default Setting
