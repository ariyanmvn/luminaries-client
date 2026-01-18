import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Redirect() {
  return (
    <div className="min-h-screen  flex py-24 items-center justify-center bg-green-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
        {/* Green Tick Icon */}
        <CheckCircleIcon className="w-24 h-24 mx-auto text-green-500 mb-6" />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-5">
          Your request has been submitted and is under review. <br />
          We will notify you via email once it is confirmed. <br />
          Thanks for being with us!
        </p>

        <Link
          to={"/joined-students"}
          className="bg-blue-500 text-white font-bold rounded-xl px-2 py-2 "
        >
          Click Here See Joined Students
        </Link>
      </div>
    </div>
  );
}
