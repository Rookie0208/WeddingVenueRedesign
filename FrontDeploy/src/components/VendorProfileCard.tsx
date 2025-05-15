import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useUpdateVendorMutation } from "../redux/api/vendor";
import { logout } from "../redux/reducer/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetVendorByIdQuery } from "../redux/api/vendor";

interface Props {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password?: string | undefined;
  profile?: string | undefined;
  // role: string | undefined;
  id?: string | undefined;
}

const VendorProfileCard: React.FC<Props> = ({
  name,
  profile,
  phone,
  email,
  password,
  id,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [updateVendor] = useUpdateVendorMutation();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    password,
    profile,
    // role: vendor.role
  });

  const navigate = useNavigate(); // Create history object for navigation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData({ ...formData, profile: reader.result as string });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("id is ", "id");
    console.log("data is :", formData);
    if (!id) return; // Ensure id is present
    const res = await updateVendor({ vendorId: id, formData: formData });
    console.log("res is: ", res);
    setEditing(false);
    window.location.reload();
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleTabClick = (tabName: string) => {
    // Navigate to different pages based on the tab clicked
    switch (tabName) {
      case "My venues":
        navigate("/my-venues");
        break;
      case "My services":
        navigate("/my-services");
        break;
      case "List a new service":
        navigate("/list-service");
        break;
      case "Logout":
        // Perform logout logic here
        dispatch(logout());
        navigate("/");

        break;
      default:
        break;
    }
  };

  const vendorid = useSelector((state: RootState) => state?.auth?.user?._id);
  const { data: vendor } = useGetVendorByIdQuery(vendorid || "");
  const vendorData = vendor?.data?.vendor;
  // console.log("vendor data", vendor);
  if (vendorData?.portfolio) {
    formData.profile = vendorData?.portfolio[0];
  } else {
    formData.profile = "/public/userAvatar.jpg";
  }

  return (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-gray-100">
  <div className="w-full max-w-md space-y-6">

    {/* Profile Image */}
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
        <img
          src={formData.profile}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Info/Form Section */}
    <div className="text-center w-full">
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            defaultValue={vendorData?.name}
            value={formData.name}
            onChange={handleInputChange}
            className="w-full text-sm bg-transparent text-black border-b border-gray-300 focus:outline-none focus:border-pink-400 py-1"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            defaultValue={vendorData?.email}
            value={formData.email}
            onChange={handleInputChange}
            className="w-full text-sm bg-transparent text-black border-b border-gray-300 focus:outline-none focus:border-pink-400 py-1"
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            defaultValue={vendorData?.phone}
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full text-sm bg-transparent text-black border-b border-gray-300 focus:outline-none focus:border-pink-400 py-1"
          />

          <div className="flex justify-center space-x-4 pt-2">
            <button
              type="submit"
              className="bg-gray-500 hover:bg-black text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 hover:bg-black text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="text-3xl font-semibold my-2 text-gray-700">{vendorData?.name || "Name not available"}</h3>
          <p className="text-gray-600">{vendorData?.email || "Email not available"}</p>
          <p className="text-gray-600">{vendorData?.phone || "Phone number not available"}</p>
          <button
            onClick={handleEditClick}
            className="bg-gray-700 hover:bg-black text-white px-8 py-2 rounded-md w-full mt-4"
          >
            Edit
          </button>
        </>
      )}
    </div>

    {/* Logout */}
    <div className="text-center">
      <button
        onClick={() => handleTabClick("Logout")}
        className="bg-gray-700 text-white px-8 py-2 rounded-md w-full hover:bg-black hover:border-[#110069]"
      >
        Logout
      </button>
    </div>

    {/* Business Info Card */}
    <div className="shadow-md rounded-lg p-4 w-full bg-gradient-to-r from-[#1e1e1e] to-gray-800">
      <h3 className="text-lg font-bold text-gray-400">Business Name:</h3>
      <p className="text-white text-2xl break-words">{vendorData?.businessName || "Not Available"}</p>

      <h3 className="text-lg font-bold text-gray-400 mt-4">Type of Business:</h3>
      <p className="text-white text-2xl break-words">{vendorData?.type_Of_Business || "Not Available"}</p>
    </div>
  </div>
</div>

  );
};
export default VendorProfileCard;
