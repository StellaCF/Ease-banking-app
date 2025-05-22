import React from 'react'
import Sidebar from '../../components/SideBar'

const Setting = () => {
  return (
   <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar/>
      <main>
         <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-8 md:ml-64">
            <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
               <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
               <p>Manage your account settings here.</p>
            </div>
            <div>
               <button>Reset Transaction Pin</button>
               <button>Delete Account</button>
            </div>
         </div>
      </main>
    </div>
  )
}

export default Setting
