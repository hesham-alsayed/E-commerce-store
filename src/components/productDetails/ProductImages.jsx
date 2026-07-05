export default function ProductImages({
  currentVariant,
  mainImage,
  setMainImage,
  handleMove,
  position,
  product,
}) {
  console.log(currentVariant);

  return (
    <div className="flex sm:justify-center flex-col-reverse max-sm:flex-row sm:flex-row gap-4">
      <div className="flex max-sm:flex-col sm:flex-col gap-3">
        {currentVariant?.images?.map((img, index) => (
          <div
            key={index}
            onClick={() => setMainImage(img)}
            className={`w-20 h-26 cursor-pointer rounded-lg overflow-hidden border ${
              mainImage === img ? "border-black" : "border-gray-300"
            }`}
          >
            <img
              src={img}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div
        onMouseMove={handleMove}
        className="sm:w-105 sm:h-150 w-full h-135 rounded-xl overflow-hidden"
      >
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover  transition-transform duration-800 hover:scale-350"
          style={{
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
        />
      </div>
    </div>
  );
}
