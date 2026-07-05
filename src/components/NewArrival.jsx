
export default function NewArrival() {
  const products = [
    {
      name: "Classic T-Shirt",
      description: "Comfortable cotton t-shirt in multiple colors.",
      price: 19.99,
      discount: "20%",
      image:
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
    },
    {
      name: "Running Shoes",
      description: "Lightweight shoes for everyday running.",
      price: 79.99,
      discount: null,
      image:
        "https://images.pexels.com/photos/17931134/pexels-photo-17931134.jpeg",
    },
    {
      name: "Denim Jacket",
      description: "Stylish denim jacket for casual outings.",
      price: 59.99,
      discount: "15%",
      image:
        "https://images.pexels.com/photos/13662420/pexels-photo-13662420.jpeg",
    },
  ];
  return (
    <section className="py-8 px-6">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Explore New Arrivals
        </h2>
        <p className="text-gray-600 text-sm md:text-[16px] mb-6 capitalize text-center">
          Check out our latest collection! Trendy and curated just for you –
          find your next favorite style here.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col
        ${index === 2 ? "sm:col-span-2 md:col-span-1" : ""}`}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount} OFF
                </span>
              )}
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <span className="text-gray-900 font-bold text-lg">
                ${product.price.toFixed(2)}
              </span>
              <button className="mt-2 bg-black text-white py-1 rounded hover:bg-gray-800 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
