
export default function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full py-2 px-3 text-xs font-semibold text-gray-800">
      <div className="text-sm">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
