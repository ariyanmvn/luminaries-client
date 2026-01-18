import React from "react";
import { motion } from "framer-motion";
import batchPhoto from "../assets/batch-photo.jpg"; // replace with your photo
import { Link } from "react-router-dom";

export default function MiddleSection() {
  return (
    <div className="bg-blue-50 text-gray-900">
      {/* Landing Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-blue-600 mb-6"
        >
          Luminaries '26: Our Grand Finale
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl text-blue-400 max-w-2xl"
        >
          Step into the ultimate celebration of memories, friendships, and
          laughter. Join us for an unforgettable Rag Day experience, where every
          moment shines bright and marks the perfect farewell to our school
          journey.
        </motion.p>
      </section>

      {/* Batch Photo Section */}
      <section className="py-16 bg-blue-100 flex flex-col items-center px-4 md:px-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-blue-600 mb-8"
        >
          Our Memories
        </motion.h2>
        <motion.img
          src={batchPhoto}
          alt="Batch Photo"
          className="rounded-xl shadow-lg max-w-full w-full md:w-3/4"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </section>

      {/* Ticket Packages Section */}
      <section className="py-16 px-4 md:px-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-blue-600 text-center mb-12"
        >
          Get Your Ticket
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Premium Package */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex-1 text-center hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-blue-500 mb-4">
              Premium Package
            </h3>
            <p className="text-blue-400 mb-6">1450 BDT</p>
            <ul className="text-left text-blue-500 mb-6 list-disc list-inside">
              <li>Official Rag Day Shirt / T-shirt</li>
              <li>Customized Rag Day Bag</li>
              <li>Customized Key Ring</li>
              <li>Customized Luminaries Writing Pad</li>
              <li>All extras included</li>
            </ul>
            <Link
              to={"/buynow/premium"}
              className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Buy Now
            </Link>
          </motion.div>

          {/* Standard Package */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex-1 text-center hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-blue-500 mb-4">
              Standard Package
            </h3>
            <p className="text-blue-400 mb-6">1050 BDT</p>
            <ul className="text-left text-blue-500 mb-6 list-disc list-inside">
              <li>Official Rag Day Shirt / T-shirt</li>
              <li>Customized Key Ring</li>
              <li>Customized Luminaries Writing Pad</li>
              <li>All extras included</li>
            </ul>
            <Link
              to={"/buynow/standard"}
              className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Buy Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
