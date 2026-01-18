import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50  bg-white/70 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-2xl font-bold text-blue-500 tracking-tight"
        >
          Luminaries 26
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to={"/"} className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link to={"/"} className="hover:text-blue-500 transition">
            About
          </Link>
          <Link
            to={"/joined-students"}
            className="hover:text-blue-500 transition"
          >
            Joined Students
          </Link>
          <Link to={"/tickets"} className="hover:text-blue-500 transition">
            Tickets
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-square btn-ghost"
          >
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md w-full px-6 py-4 flex flex-col gap-4 absolute top-full left-0">
          <Link
            to={"/"}
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-500 transition"
          >
            Home
          </Link>
          <Link
            to={"/"}
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-500 transition"
          >
            About
          </Link>
          <Link
            to={"/joined-students"}
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-500 transition"
          >
            Joined Students
          </Link>
          <Link
            to="/tickets"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-500 transition"
          >
            Tickets
          </Link>
        </div>
      )}
    </header>
  );
}
