export default function FreeShippingProgress({ cart, setting }) {
  if (!setting?.enabled) return null;

  const threshold = Number(setting?.value) || 0;

  const total =
    cart?.items?.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0) || 0;

  const remaining = Math.max(threshold - total, 0);

  const progress = threshold ? Math.min((total / threshold) * 100, 100) : 0;

  const isFree = threshold > 0 && total >= threshold;

  return (
    <div className="mb-4">
      <p className="capitalize text-[13px] mb-2 font-medium">
        {isFree
          ? "🎉 Congratulation You got free shipping!"
          : `Add LE ${remaining} EGP more for free shipping`}
      </p>

      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-800 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-end text-xs text-gray-500 mt-1">
        <span>LE {threshold}</span>
      </div>
    </div>
  );
}
