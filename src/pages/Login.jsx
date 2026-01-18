import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch admins from backend
      const response = await fetch("https://rag-day.vercel.app/admins");
      const data = await response.json();

      if (response.ok && data.success) {
        const admin = data.orders.find(
          (a) => a.email === formData.email && a.password === formData.password,
        );

        if (admin) {
          toast.success("Login successful!");
          localStorage.setItem("isAdminLoggedIn", "true");
          localStorage.setItem("adminEmail", admin.email);
          setTimeout(() => {
            navigate("/admin"); // redirect after a short delay
          }, 1000);
        } else {
          toast.error("Invalid email or password");
        }
      } else {
        toast.error("Failed to fetch admin data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center">
          Admin Login
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}
