import { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from '../redux/reducer/auth';
import { RootState } from '../redux/store'; 
import { useSubmitEnquiryMutation } from '../redux/api/enquiry';
import { Enquiry } from "../types/types"
import "./PopUp.css"

const PopUp = () => {
  const [formData, setFormData] = useState<Enquiry>({
    name: '',
    contact: '',
    location: '',
    guests: "",
    date: "",
    address: '',
    message: '',
    typeOfEvent: ''
  });
  const [submit] = useSubmitEnquiryMutation();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0 && !isLoggedIn) {
      setShowLoginPopup(true);
    }
  }, [seconds, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      setShowLoginPopup(false);
      setSeconds(10);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (showLoginPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showLoginPopup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'contact') {
      // Only allow digits and limit to 10 characters
      const newValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prevState => ({
        ...prevState,
        [name]: newValue
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      await submit(formData).unwrap();
      setFormData({
        name: '',
        contact: '',
        location: '',
        guests: "",
        date: "",
        address: '',
        message: '',
        typeOfEvent: ''
      });
      setShowLoginPopup(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
     {showLoginPopup && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-auto scrollbar">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-white focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h1 className='text-2xl font-bold text-black mb-2 font-marcellus text-center'>Welcome to Weddingz Venue</h1>
      <h2 className='text-base font-semibold text-black mb-8 text-center'>Please fill the enquiry form</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-black mb-1">Contact</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            pattern="[0-9]{10}"
            title="Please enter exactly 10 digits"
            maxLength={10}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-black mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-black mb-1">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-black mb-1">Date of Event</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="typeOfEvent" className="block text-sm font-medium text-black mb-1">Type of Event</label>
          <input
            type="text"
            id="typeOfEvent"
            name="typeOfEvent"
            value={formData.typeOfEvent}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-black mb-1">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-black mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="md:col-span-2 flex justify-end space-x-2">
          <button type="button" onClick={handleClose} className="bg-gray-400 text-black font-medium py-2 px-4 rounded hover:bg-gray-500 transition duration-300">Close</button>
          <button type="submit" className="bg-black text-white font-medium py-2 px-4 rounded hover:bg-white hover:text-black transition duration-300">Submit</button>
        </div>
      </form>
    </div>
  </div>
)}


    </>
  );
};

export default PopUp;
