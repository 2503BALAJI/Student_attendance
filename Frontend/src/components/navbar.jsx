import React from 'react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="bg-red-900 p-5 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Sinhgad Attendence</h1>
          
          <button 
            className="text-white md:hidden focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          <ul className={`md:flex md:space-x-6 absolute md:static bg-blue-800 md:bg-transparent top-14 left-0 w-full md:w-auto text-white transition-all ${isOpen ? "block" : "hidden"}`}>
            <li className="p-2 md:p-0 hover:bg-blue-700 md:hover:bg-transparent"><a href="/">Home</a></li>
            <li className="p-2 md:p-0 hover:bg-blue-700 md:hover:bg-transparent"><a href="#">Dashboard</a></li>
            <li className="p-2 md:p-0 hover:bg-blue-700 md:hover:bg-transparent"><a href="#">Students</a></li>
            <li className="p-2 md:p-0 hover:bg-blue-700 md:hover:bg-transparent"><a href="#">Attendance</a></li>
            <li className="p-2 md:p-0 hover:bg-blue-700 md:hover:bg-transparent"><a href="/signup">Signup</a></li>
            <li className="p-2 md:p-0 hover:bg-blue-700 md:hover:bg-transparent"><a href="/login">Login</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;