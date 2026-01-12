import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center h-screen text-center"
    >
      <motion.h1
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-8xl font-bold text-blue-600"
      >
        404
      </motion.h1>

      <p className="mt-4 text-gray-600">
        Halaman tidak ditemukan
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:scale-105 transition"
      >
        Kembali ke Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
