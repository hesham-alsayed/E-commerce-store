import { motion as _motion } from "framer-motion";

export default function FullScreenLoader({ text = "Processing..." }) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <_motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        {}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

        {}
        <p className="text-sm text-gray-600 text-center">{text}</p>
      </_motion.div>
    </div>
  );
}