"use client";

import { FiTrash2 } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/lib/features/cartSlice";

export default function CartItem({ item, onIncrease, onDecrease }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-4 py-4 ">
      <div className="overflow-hidden w-12 h-18 rounded">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded hover:scale-110 transition-all"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-sm capitalize font-medium">{item?.title}</h3>

        <p className="text-xs flex gap-3 items-center text-gray-500">
          {item.color} / {item.size}
        </p>

        <div className="inline-flex w-max items-center mt-2 border py-1 px-3 border-gray-300 rounded">
          <button
            type="button"
            onClick={() => onDecrease(item)}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
          >
            <FaMinus size={10} />
          </button>

          <span className="px-4 text-[12px] lg:text-sm">{item.quantity}</span>

          <button
            type="button"
            onClick={() => onIncrease(item)}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
          >
            <FaPlus size={10} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end mr-4 justify-between">
        <div className="text-right">
          <p className="font-semibold text-sm">
            LE {Math.floor(item.price * item.quantity)} EGP
          </p>
        </div>

        <button
          onClick={() => dispatch(removeFromCart(item._id))}
          className="text-gray-500 hover:bg-gray-100 p-2 transition-all hover:cursor-pointer rounded hover:text-red-500"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
