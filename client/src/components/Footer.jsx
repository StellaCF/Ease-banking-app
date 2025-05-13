import React from 'react'

const Footer = () => {
  return (
    <div>
            <footer className="bg-blue-950 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Bank. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
