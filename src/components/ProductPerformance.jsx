const ratings = [
  { name: "Comfort", value: 4.5 },
  { name: "Quality", value: 3.8 },
  { name: "Durability", value: 4.2 },
  { name: "Fit", value: 3.5 },
];

export default function ProductPerformance() {
  return (
    <div className="space-y-4 mt-3">
      {ratings.map((item, index) => {
        const percent = (item.value / 5) * 100;

        return (
          <div key={index} className="space-y-1">
            {}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name}</span>
              <span className="font-medium">{item.value}/5</span>
            </div>

            {}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
