import React, { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";

interface VenueProps {
  venue: {
    name: string | undefined;
    state: string | undefined;
    city: string | undefined;
    maxGuests: string | undefined;
    contact: string | undefined;
    description: string | undefined;
    vegPrice?: string | undefined;
    nonVegPrice?: string | undefined;
    images: string[] | undefined;
    id: string | undefined;
  };
}

const VenueCardMain: React.FC<VenueProps> = ({ venue }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!venue?.images || venue.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (venue.images?.length || 0) - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [venue?.images?.length, venue.images]);

  return (
    <Link to={`/venuelist/${venue.id}`} className="block" target="_blank">
      <div className="relative bg-white rounded-lg overflow-hidden hover:shadow-md transition-transform transform mx-2 my-2 cursor-pointer">
        {/* Image Section */}
        <div className="h-48 p-2">
          {venue.images && <img
            src={venue.images[currentImageIndex]}
            alt="Venue Image"
            className="w-full h-full object-cover rounded-lg"
          />}
        </div>

        {/* Venue Details */}
        <div className="p-3">
          <h2 className="text-base text-lg font-semibold mb-4 truncate">{venue.name}</h2>

          <div className="flex items-center font-md text-gray-500 mb-2">
            <MdLocationPin className="mr-0" />
            <span className="truncate">{venue.state}{venue.city}</span>
          </div>

          <div className="flex items-left justify-between text-sm text-gray-500 mb-0">
            <span>Veg</span>
            <span>Non-Veg</span>
          </div>
          <div className="flex items-left justify-between text-lg font-semibold text-base mb-2">
            {/* <span>₹{venue.vegPrice} <span className="text-sm text-gray-900 font-normal">per plate</span></span> */}
            <span>
              {venue.vegPrice === "none" ? (
                "None"
              ) : (
                <>
                  ₹{venue.vegPrice}{" "}
                  <span className="text-sm text-gray-900 font-normal">per plate</span>
                </>
              )}
            </span>
            <span>
              {venue.nonVegPrice === "none" ? (
                "None"
              ) : (
                <>
                  ₹{venue.nonVegPrice}{" "}
                  <span className="text-sm text-gray-900 font-normal">per plate</span>
                </>
              )}
            </span>

            {/* <span>₹{venue.nonVegPrice} <span className="text-sm text-gray-900 font-normal">per plate</span></span> */}
          </div>

          <div className="flex items-center text-sm text-base font-semibold mb-2">
            <span className="bg-gray-200 px-1 py-0.5 rounded-sm border border-gray-300">
              {venue.maxGuests} pax
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCardMain;
