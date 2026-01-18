import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Ticksts() {
  return (
    <section className="py-24 px-4 md:px-20">
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
  );
}
