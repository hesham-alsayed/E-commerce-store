"use client";

import { useEffect, useState, useRef } from "react";

export default function ProductsToolbar({ columns, setColumns }) {
  const userChanged = useRef(false);

  const [options, setOptions] = useState([2]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      // eslint-disable-next-line no-useless-assignment
      let newOptions = [];
      // eslint-disable-next-line no-useless-assignment
      let defaultValue = 2;

      // 📱 0 → 400
      if (w < 400) {
        newOptions = [1];
        defaultValue = 1;
      }

      // 📲 400 → 1024
      else if (w < 1024) {
        newOptions = [1, 2];
        defaultValue = 2;
      }

      // 💻 1024+
      else {
        newOptions = [3, 4, 5];
        defaultValue = 3;
      }

      setOptions(newOptions);

      if (!userChanged.current) {
        setColumns(defaultValue);
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [setColumns]);

  const handleClick = (num) => {
    userChanged.current = true;
    setColumns(num);
  };

  return (
    <div className="flex items-center gap-2">
      {options.map((num) => (
        <button
          key={num}
          onClick={() => handleClick(num)}
          className={`w-5 h-5 text-xs rounded-sm hover:cursor-pointer hover:opacity-85 transition ${
            columns === num
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
