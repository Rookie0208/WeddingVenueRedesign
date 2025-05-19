import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaHeart, FaEdit, FaShareAlt, FaMapMarkerAlt} from "react-icons/fa";
import { useDeleteWishlistMutation, useGetWishlistQuery, useAddWishlistMutation } from "../redux/api/wishlist";
import ReviewModal from "./ReviewModal";

interface VendorInfoProps {
  name: string | undefined;
  location: string | undefined;
  reviews: number | undefined;
  address: string | undefined;
  photosCount: number | undefined;
  shareMessage: string;
  summary: string | undefined;
  businessType: string | undefined
}

const VendorInfo: React.FC<VendorInfoProps> = ({ 
  name,
  location,
  reviews,
  address,
  photosCount,
  shareMessage,
  summary,
  businessType,
 }) => {
  const userId = useSelector((state: RootState) => state?.auth?.user?._id);
  const { id: vendorId } = useParams<{ id: string }>();
  const [isWishlistSelected, setIsWishlistSelected] = useState(false);
  const [addWishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const { data: wishlistData, refetch } = useGetWishlistQuery(userId ?? "");
  const itemId = vendorId;
  const itemType = "vendor";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleShareOnWhatsApp = () => {
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappURL, "_blank")};

  useEffect(() => {
    if (wishlistData) {
      const isWishlisted =
        wishlistData?.wishlist?.items?.some((item) => item.itemId === itemId) ?? false;
      setIsWishlistSelected(isWishlisted);
    }
  }, [wishlistData, itemId]);

  const handleWishlistClick = async () => {
    try {
      if (isWishlistSelected) {
        if (userId && itemId && itemType) {
          await deleteWishlist({ userId, itemId, itemType }).unwrap();
        } else {
          console.error("userId, itemId, or itemType is undefined!");
        }
        console.log("Item removed from wishlist");
      } else {
        if (userId && itemId && itemType) {
          await addWishlist({ userId, itemId, itemType }).unwrap();
        } else {
          console.error("userId, itemId, or itemType is undefined!");
        }
        console.log("Item added to wishlist");
      }
      refetch();
      setIsWishlistSelected(!isWishlistSelected);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };


  return (
    <div className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
          
        <div className="flex items-center text-green-600">
          <span className="text-lg font-semibold">{reviews} reviews</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-1 flex items-center">
        <FaMapMarkerAlt className="mr-1 text-blue-600" />
        {location}
      </p>
       <p>{businessType}</p>
      <p className="text-gray-600 text-sm mb-4">{address}</p>
      <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
        <span>{photosCount} Photos</span>
        {userId && (
          <button className="hover:text-black flex items-center" onClick={handleWishlistClick}>
          <FaHeart className="mr-1" /> {isWishlistSelected ? "Added to Wishlist" : "Wishlist"}
        </button>
        )}
        <button className="hover:text-black flex items-center" onClick={handleModalOpen}>
          <FaEdit className="mr-1" /> Write a Review
        </button>
        <button className="hover:text-black flex items-center" onClick={handleShareOnWhatsApp}>
          <FaShareAlt className="mr-1" /> Share
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md mt-4 p-4 border border-1 border-gray-500">
        {summary}
      </div>
      {isModalOpen && <ReviewModal onClose={handleModalClose} />}
    </div>
  );
};

export default VendorInfo;
