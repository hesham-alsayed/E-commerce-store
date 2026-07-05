import { useState } from "react";
import { FiChevronsDown } from "react-icons/fi";

export default function Accordion({ title, icon: Icon, children, bgColor }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded mb-2 bg-white hover:border-gray-500">
      
      {/* Header */}
    <button
        onClick={() => setOpen(!open)}
        className={`w-full ${bgColor ? bgColor : ""} ${
          bgColor ? "text-white" : ""
        } flex items-center text-sm capitalize justify-between py-2 px-4 text-left`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-[16px]" />}
          {title}
        </div>

        <FiChevronsDown
          className={`transition-transform duration-200 text-[16px] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-0">{children}</div>
      </div>
    </div>
  );
}