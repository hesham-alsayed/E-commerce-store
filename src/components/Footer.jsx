import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-start  sm:text-left">
          
          {}
          <div className="  sm:mx-0 max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>

            <p className="text-sm text-gray-600 mb-2">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </p>

            <p className="text-sm font-medium mb-4">
              Sign up and get 10% off your first order.
            </p>

            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none outline-none"
              />
              <button className="bg-black text-white px-4 py-2 mt-3 sm:mt-0 sm:rounded-r-md sm:rounded-l-none rounded-md hover:bg-gray-900 transition">
                Subscribe
              </button>
            </div>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer transition">
                Men's Top Wear
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Women's Top Wear
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Men's Bottom Wear
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Women's Bottom Wear
              </li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer transition">
                Contact Us
              </li>
              <li className="hover:text-black cursor-pointer transition">
                About Us
              </li>
              <li className="hover:text-black cursor-pointer transition">
                FAQs
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Features
              </li>
            </ul>
          </div>

          {}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

            <div className="flex gap-4 mb-6 text-gray-700 text-xl">
              <FaFacebookF className="cursor-pointer hover:text-black transition" />
              <FaInstagram className="cursor-pointer hover:text-black transition" />
              <FaXTwitter className="cursor-pointer hover:text-black transition" />
            </div>

            <div>
              <p className="text-sm mb-3 text-gray-600">Call Us</p>

              <div className="flex items-center justify-center sm:justify-start gap-3">
                <FiPhoneCall className="text-gray-600" />
                <p className="font-semibold">0123-456-789</p>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="border-t mt-12 pt-6 text-center text-sm text-gray-600">
          © 2024, CompileTab. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}