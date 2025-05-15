import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateVenueMutation } from '../redux/api/venue';
import { logout } from '../redux/reducer/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
// import VenueProfileInfo from '../components/VenueProfileInfo';

import { useGetVenueByIdQuery } from '../redux/api/venue';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';




interface Props {
  yourName?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  password?: string | undefined;
  profile?: string | undefined;
  id?: string | undefined;
}



const VenueProfileCard: React.FC<Props> = ({ yourName, profile, phone, email, password, id }) => {
  const [updateVenue] = useUpdateVenueMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    yourName,
    email,
    phone,
    password,
    profile,
  });

  const navigate = useNavigate();

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
    if (!id) return;
    await updateVenue({ venueId: id, formData: formData });
    setEditing(false);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const venueId = useSelector((state: RootState) => state?.auth?.user?._id);
  console.log("user", venueId)


  const { data: venue } = useGetVenueByIdQuery(venueId || "");

  const venueData = venue?.data?.venue;
  formData.profile = venueData?.images?.[0] || "/userAvatar.jpg";
  console.log("vendue data", venueData);

  const handleCancelClick = () => {
    setEditing(false);
  }
  const handleTabClick = (tabName: string) => {
    switch (tabName) {
      case 'My venues':
        navigate('/my-venues');
        break;
      case 'My services':
        navigate('/my-services');
        break;
      case 'List a new service':
        navigate('/list-service');
        break;
      case 'Logout':
        // Perform logout logic here
        dispatch(logout());
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-full">
      <div className="m-2">
        <div className="flex flex-col rounded-lg p-4 items-center justify-center w-full">
          <div className="mt-8 w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="mt-4 text-center w-full">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>

                <input
                  type="text"
                  id="yourName"
                  name="yourName"
                  placeholder='Enter Your Name'
                  defaultValue={yourName}
                  value={formData.yourName}
                  onChange={handleInputChange}
                  className="w-full text-sm bg-transparent text-black border-b border-gray-300 focus:outline-none focus:border-pink-400 py-1"
                />
              </div>
              <div className='mb-4'>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Email'
                  defaultValue={email}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-sm bg-transparent text-black border-b border-gray-300 focus:outline-none focus:border-pink-400 py-1"
                />
              </div>
              <div className='mb-4'>

                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder='Phone Number'
                  defaultValue={phone}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full text-sm bg-transparent text-black border-b border-gray-300 focus:outline-none focus:border-pink-400 py-1"
                />
              </div>
              {/* <div className='mb-4'>
                <label htmlFor="profilePic" className="block mb-1 text-white">Profile Picture:</label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm bg-transparent text-black  py-1"
                />
              </div> */}
              <button
                type="submit"
                className="bg-gray-500 hover:bg-black text-white px-4 py-2 rounded-md">
                Update
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 hover:bg-black text-white px-4 py-2 rounded-md ml-4">
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h3 className="text-3xl font-semibold my-2 text-gray-500">{yourName}</h3>
              <p className="text-gray-500">{email}</p>
              <p className="text-gray-500">{phone}</p>
              <button
                onClick={handleEditClick}
                className="bg-gray-700 hover:bg-black text-white px-8 py-2 rounded-md w-full mt-4"
              >
                Edit
              </button>
            </>
          )}
        </div>
        <div className="mt-4 text-xl w-full">
          {['Logout'].map(tab => (
            <div
              key={tab}
              className="bg-gray-700 text-white px-8 py-2 rounded-md w-full mb-4 text-center hover:bg-black  hover:border-[#110069]"
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="shadow-md rounded-lg p-4 w-80 bg-gradient-to-r from-[#1e1e1e] to-gray-800" style={{ borderRadius: '12px' }}>
          <h3 className="text-lg font-bold text-gray-600">Business Name:</h3>
          <p className="text-white-100 text-3xl">{venueData?.businessName || "Not Available"}</p>

          <h3 className="text-lg font-bold text-gray-600 mt-3">Type of Address:</h3>
          <p className="text-white-100  text-3xl">{venueData?.address || "Not Available"}</p>
          {/* <VenueProfileInfo businessName={venueData?.businessName}  address={venueData?.address}/> */}
        </div>
      </div>
    </div>
  );
};

export default VenueProfileCard;
