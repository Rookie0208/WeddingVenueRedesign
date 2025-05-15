import { useState } from "react";
import { FaTimes, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {open && (
        <div className="flex flex-col items-end space-y-2 mb-2">
          <Link
            to="/link1"
            onClick={handleLinkClick}
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Hotel Inquiry
          </Link>
          <Link
            to="/auth/businessRegistration/VendorRegistrationForm"
            onClick={handleLinkClick}
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Register as Vendor
          </Link>
          <Link
            to="/auth/businessRegistration/VenueRegistrationForm"
            onClick={handleLinkClick}
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Register as Venue
          </Link>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-[#1e1e1e] hover:bg-black bg-opacity-90 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300"
      >
        {open ? <FaTimes size={20} /> : <FaLink size={20} />}
      </button>
    </div>
  );
}
