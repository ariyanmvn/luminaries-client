import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function JoinedStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://rag-day.vercel.app/orders");
        const data = await response.json();

        if (data.success) {
          const confirmedStudents = data.admins.filter(
            (student) => student.status === "confirmed"
          );
          setStudents(confirmedStudents);
        } else {
          toast.error("Failed to fetch students: " + data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-xl">Loading students...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <p className="text-gray-600 text-xl">
          No confirmed students found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
          Confirmed Joined Students
        </h1>
        <div className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full shadow">
          Total: {students.length}
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-4">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-blue-500 text-white rounded-t-xl">
            <tr>
              <th className="py-3 px-6 font-medium">#</th>
              <th className="py-3 px-6 font-medium">Name</th>
              <th className="py-3 px-6 font-medium">Package</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{student.name}</td>
                <td className="py-3 px-6 capitalize font-semibold">
                  {student.totalAmount > 1200 ? "Premium" : "Standard"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
