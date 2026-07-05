import MenCollections from "@/assets/pexels-cottonbro-4727484.jpg";
import ChildCollection from "@/assets/pexels-ketut-subiyanto-4473871.jpg";
import SummerCollection from "@/assets/pexels-loquellano-10084285.jpg";

export default function GenderCollections() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6 py-6 overflow-hidden">
      {}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={MenCollections}
          alt="Men Collection"
          className="w-full aspect-4/5 object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4 text-center flex flex-col items-center gap-2">
          <span className="text-lg md:text-xl font-semibold">
            Mens Collections
          </span>
          <span className="text-base md:text-lg font-semibold">
            Up To 70% Off
          </span>
          <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={ChildCollection}
          alt="Child Collection"
          className="w-full aspect-4/5 object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4 text-center flex flex-col items-center gap-2">
          <span className="text-lg md:text-xl font-semibold">
            Child Collections
          </span>
          <span className="text-base md:text-lg font-semibold">
            Up To 70% Off
          </span>
          <button className="bg-white text-black  px-4 py-1 rounded hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {}
      <div className="relative md:col-span-2 overflow-hidden rounded-lg">
        <img
          src={SummerCollection}
          alt="Summer Clearance"
          className="w-full aspect-16/7 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center text-center px-4 gap-4">
          <span className="text-2xl md:text-5xl lg:text-7xl font-semibold">
            Summer Clearance
          </span>
          <span className="text-lg md:text-3xl font-semibold">
            Up To 60% Off
          </span>
          <button className="bg-white text-black text-[14px] md:text-lg px-2 md:px-6 py-1 md:py-2 rounded hover:bg-gray-200 transition mt-3">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
