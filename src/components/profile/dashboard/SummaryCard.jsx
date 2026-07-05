import { FiClock, FiPackage, FiDollarSign } from "react-icons/fi";

export default function SummaryCard({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-6">
      {/* Total Orders */}
      <div className="bg-white rounded-2xl shadow p-2 lg:p-6 flex items-center gap-4 hover:shadow-lg transition">
        <div className="bg-gray-100 p-2 lg:p-4 rounded-xl text-gray-700">
          <FiPackage size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h3 className="text-xl font-semibold">{stats.totalOrders || 0}</h3>
        </div>
      </div>

      {/* Current Orders */}
      <div className="bg-white rounded-2xl shadow p-2 lg:p-6 flex items-center gap-4 hover:shadow-lg transition">
        <div className="bg-gray-100 p-2 lg:p-4 rounded-xl text-gray-700">
          <FiClock size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Current Orders</p>
          <h3 className="text-xl font-semibold">{stats.currentOrders || 0}</h3>
        </div>
      </div>

      {/* Total Spent */}
      <div className="bg-white rounded-2xl shadow p-2 lg:p-6 flex items-center gap-4 hover:shadow-lg transition">
        <div className="bg-gray-100 p-2 lg:p-4 rounded-xl text-gray-700">
          <FiDollarSign size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Spent</p>
          <h3 className="text-xl font-semibold">${stats.totalSpent || 0}</h3>
        </div>
      </div>
    </div>
  );
}
