import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function BuyNow() {
  const { selectedPackage } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tshirtSize: "",
    bKashNumber: "",
    transactionId: "",
    sunglasses: false,
    totalAmount: 0,
    status: "pending",
    package: `${selectedPackage}`,
  });

  const [loading, setLoading] = useState(false); // <-- loader state

  // Package prices
  const packagePrices = {
    standard: 1050,
    premium: 1450,
  };
  const packagePrice = packagePrices[selectedPackage] || 0;

  useEffect(() => {
    setFormData((prev) => ({ ...prev, totalAmount: packagePrice }));
  }, [packagePrice]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "sunglasses") {
      const addedAmount = checked ? 300 : -300;
      setFormData((prev) => ({
        ...prev,
        sunglasses: checked,
        totalAmount: prev.totalAmount + addedAmount,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    try {
      const response = await fetch("https://rag-day.vercel.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Order submitted successfully! Order ID: " + data.orderId,
        );
        navigate("/redirect");

        // reset form
        setFormData({
          name: "",
          email: "",
          tshirtSize: "",
          bKashNumber: "",
          transactionId: "",
          sunglasses: false,
          totalAmount: packagePrice,
          status: "pending",
        });
      } else {
        toast.error("Failed to submit order: " + data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Check console.");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b py-40 md:pt-24 from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center">
          Buy Now - {selectedPackage} Package
        </h1>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your official name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            disabled={loading} // disable while submitting
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            disabled={loading}
          />
        </div>

        {/* T-shirt Size */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">
            T-shirt Size
          </label>
          <select
            name="tshirtSize"
            value={formData.tshirtSize}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            disabled={loading}
          >
            <option value="">Select size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        {/* Sunglasses */}
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="sunglasses"
            checked={formData.sunglasses}
            onChange={handleChange}
            className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          <span className="text-gray-700 font-medium">
            Add Sunglasses (+300 BDT)
          </span>
        </label>

        {/* Total Amount */}
        <p className="text-xl font-bold text-blue-500 text-right">
          Total: {formData.totalAmount} BDT
        </p>

        {/* bKash Info */}
        <div className="flex flex-col bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="font-semibold text-blue-500 mb-2">
            Send money via bKash to:
          </p>
          <p className="font-bold mb-4">01766775067</p>

          <label className="flex flex-col mb-3">
            Transaction ID
            <input
              type="text"
              placeholder="paste your transaction id here"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              disabled={loading}
            />
          </label>

          <label className="flex flex-col">
            Number used for bKash
            <input
              type="text"
              name="bKashNumber"
              placeholder="enter your bkash number here"
              value={formData.bKashNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              disabled={loading}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full cursor-pointer flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={loading} // disable while submitting
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
