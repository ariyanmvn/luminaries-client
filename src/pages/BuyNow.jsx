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
    dressType: "", // ✅ added
    bKashNumber: "",
    transactionId: "",
    sunglasses: false,
    totalAmount: 0,
    status: "pending",
    package: `${selectedPackage}`,
  });

  const [loading, setLoading] = useState(false);

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

    const bdNumberRegex = /^01[3-9]\d{8}$/;
    if (!bdNumberRegex.test(formData.bKashNumber)) {
      toast.error("Please enter a valid Bangladeshi bKash number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://rag-day.vercel.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✅ dressType sent
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Order submitted successfully! Order ID: " + data.orderId
        );
        navigate("/redirect");

        setFormData({
          name: "",
          email: "",
          tshirtSize: "",
          dressType: "",
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
      setLoading(false);
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

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3"
            disabled={loading}
          />
        </div>

        {/* ✅ Dress Type */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">
            Dress Type
          </label>
          <select
            name="dressType"
            value={formData.dressType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3"
            disabled={loading}
          >
            <option value="">Select</option>
            <option value="T-Shirt (Boys)">T-Shirt (Boys)</option>
            <option value="Shirt (Girls)">Shirt (Girls)</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">
            T-shirt Size
          </label>
          <select
            name="tshirtSize"
            value={formData.tshirtSize}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3"
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

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="sunglasses"
            checked={formData.sunglasses}
            onChange={handleChange}
            disabled={loading}
          />
          <span>Add Sunglasses (+300 BDT)</span>
        </label>

        <p className="text-xl font-bold text-blue-500 text-right">
          Total: {formData.totalAmount} BDT
        </p>

        <div className="flex flex-col bg-blue-50 p-4 rounded-xl">
          <p className="font-semibold text-blue-500 mb-2">
            Send money via bKash to:
          </p>
          <p className="font-bold mb-4">01766775067</p>

          <input
            type="text"
            name="transactionId"
            placeholder="Transaction ID"
            value={formData.transactionId}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 mb-3"
            disabled={loading}
          />

          <input
            type="text"
            name="bKashNumber"
            placeholder="bKash number"
            value={formData.bKashNumber}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
