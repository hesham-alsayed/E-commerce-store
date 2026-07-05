import { FiShoppingBag, FiRefreshCw, FiCreditCard } from "react-icons/fi";

export default function FeaturedSection() {
  const features = [
    {
      icon: <FiShoppingBag size={28} />,
      title: "FREE INTERNATIONAL SHIPPING",
      desc: "Specific free shipping in Range Time",
    },
    {
      icon: <FiRefreshCw size={28} />,
      title: "45 DAYS RETURN",
      desc: "Money back guarantee",
    },
    {
      icon: <FiCreditCard size={28} />,
      title: "SECURE CHECKOUT",
      desc: "100% secured checkout process",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1  md:grid-cols-3 gap-10 md:text-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:items-center space-y-4"
            >
              <div className="text-black">{item.icon}</div>

              <h3 className="text-sm md:text-base font-semibold tracking-wide">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
