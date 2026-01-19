import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // 📄 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const [newOrder, setNewOrder] = useState({
    name: "",
    email: "",
    tshirtSize: "",
    bKashNumber: "",
    transactionId: "",
    sunglasses: false,
    totalAmount: "",
    status: "pending",
    package: "",
  });

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://rag-day.vercel.app/orders");
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.admins);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status automatically
  const handleUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch(`https://rag-day.vercel.app/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Status updated & email sent!");

        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o,
          ),
        );
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // Delete order with SweetAlert confirmation
  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://rag-day.vercel.app/orders/${orderId}`,
          {
            method: "DELETE",
          },
        );
        const data = await res.json();
        if (res.ok && data.success) {
          toast.success("Order deleted!");
          setOrders((prev) => prev.filter((o) => o._id !== orderId));
        } else {
          toast.error("Failed to delete order");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  // Handle modal form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle modal submit
  const handleAddOrder = async (e) => {
    e.preventDefault();
    setModalLoading(true); // start loader

    try {
      const res = await fetch("https://rag-day.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Order added successfully!");
        setModalOpen(false);
        fetchOrders();
        setNewOrder({
          name: "",
          email: "",
          tshirtSize: "",
          bKashNumber: "",
          transactionId: "",
          sunglasses: false,
          totalAmount: "",
          status: "pending",
          package: "",
        });
      } else {
        toast.error(data.message || "Failed to add order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setModalLoading(false); // stop loader
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const paginatedOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen pb-12 pt-32">
      <div className="flex justify-between items-center mb-6">
        <p className="mb-6 font-medium text-lg text-gray-700">
          Total Students Joined:
          <span className="font-bold">{orders?.length}</span>
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 cursor-pointer  text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
        >
          Add Manually
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-10">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border-2 rounded-xl px-4 py-2 w-full md:w-1/2"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border-2 rounded-xl px-4 py-2 w-full md:w-1/4"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                {[
                  "Name",
                  "Email",
                  "T-shirt Size",
                  "Sunglasses",
                  "Package",
                  "Total Amount",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{order.name}</td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3">{order.tshirtSize}</td>
                  <td className="px-4 py-3">
                    {order.sunglasses ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3">{order?.package}</td>
                  <td className="px-4 py-3">{order.totalAmount} BDT</td>
                  <td className="px-4 py-3">
                    <select
                      disabled={
                        order.status === "cancelled" ||
                        order.status === "confirmed"
                      }
                      value={order.status}
                      onChange={(e) => handleUpdate(order._id, e.target.value)}
                      className={`border cursor-pointer rounded px-2 py-1 ${
                        order.status === "pending"
                          ? "bg-yellow-100"
                          : order.status === "confirmed"
                            ? "bg-green-100"
                            : "bg-red-100"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex py-5 justify-center items-center gap-2 mt-6">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 cursor-pointer rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl relative animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Order
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddOrder} className="space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={newOrder.name}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={newOrder.email}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>

              {/* Tshirt & Package */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="tshirtSize"
                  value={newOrder.tshirtSize}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">T-shirt Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>

                <select
                  name="package"
                  value={newOrder.package}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select Package</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                </select>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="bKashNumber"
                  placeholder="bKash Number"
                  value={newOrder.bKashNumber}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="transactionId"
                  placeholder="Transaction ID"
                  value={newOrder.transactionId}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Amount */}
              <input
                type="number"
                name="totalAmount"
                placeholder="Total Amount (BDT)"
                value={newOrder.totalAmount}
                onChange={handleChange}
                className="input"
              />

              {/* Sunglasses */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="sunglasses"
                  checked={newOrder.sunglasses}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Include Sunglasses</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2  cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading} // prevent multiple clicks
                  className="px-5 py-2 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md flex items-center justify-center gap-2"
                >
                  {modalLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add Order"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
