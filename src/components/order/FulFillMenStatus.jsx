import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Step({ label, active }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div
        className={`w-6 h-6 rounded-full ${
          active ? "bg-blue-600" : "bg-gray-300"
        }`}
      />
      <p className="mt-2 text-xs text-center">{label}</p>
    </div>
  );
}

export default function FulfillmentStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fulfillment Status</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 sm:gap-4">
          <Step label="Order Placed" active />
          <div className="h-1 flex-1 bg-blue-600 rounded" />
          <Step label="Packed" active />
          <div className="h-1 flex-1 bg-gray-300 rounded" />
          <Step label="Shipped" />
        </div>
      </CardContent>
    </Card>
  );
}
