import React, { useState } from 'react';

// import Caro from './Carousel3';


import { useUpdateVendorMutation } from '../redux/api/vendor';
import Loader from "../components/skeleton/Loader"
import VenueImageGallery from './VenueImageGallery';

interface Package {
    name?: string;
    days?: string;
    price?: string;
    minAdvance?: string;
}

interface Props {
    address?: string;
    price?: string;
    portfolio?: string[] | undefined;
    experience?: string;
    event_completed?: number;
    willingToTravel?: boolean;
    summary?: string;
    packages: Package | undefined;
    id?: string | undefined
    [key: string]: any;

}

const ServiceDetailsForm: React.FC<Props> = ({ address, price, portfolio, experience, event_completed, willingToTravel, summary, packages, id }) => {
    const [updateVendor] = useUpdateVendorMutation();
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    // console.log("packages", packages?.days)


    const [editing, setEditing] = useState(false);
    const [imagedata, setImageData] = useState<File[]>([]);
    const [formData, setFormData] = useState<Props>({
        address: '',
        price: '',  // Initial value for 'price' property
        portfolio: [],
        experience: '',
        event_completed: 0,
        willingToTravel: false,
        summary: '',
        packages: { name: '', days: '', price: '', minAdvance: '' },

    });
    // Function to handle input changes
    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // If the input name starts with "packages.", update the packages state
        if (name.startsWith("packages.")) {
            const packageName = name.split(".")[1]; // Extract the package property name
            setFormData((prevState: Props) => ({
                ...prevState,
                packages: {
                    ...prevState.packages,
                    name: prevState.packages?.name || '',
                    days: prevState.packages?.days || '',
                    price: prevState.packages?.price || '',
                    minAdvance: prevState.packages?.minAdvance || '',
                    [packageName]: value
                }
            }));

        } else {
            // If it's not a package property, update the top-level state properties
            if (type === 'checkbox') {
                const isChecked = (e.target as HTMLInputElement).checked;
                setFormData(prevState => ({
                    ...prevState,
                    [name]: isChecked
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageData(Array.from(e.target.files));
        }
    };

    const handleCancelClick = () => {
        setEditing(false);
    }



    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when submitting
        const formDataToSend = new FormData();


        // Append images if they exist
        imagedata.forEach((image: File) => {
            formDataToSend.append('portfolio', image);
        });
        console.log("sending : ",formData);
        // Here you can submit the updated data (formData) to your backend or perform any other action
        try {
            const result = await updateVendor({ vendorId: id || "", formData: formData }).unwrap();
            console.log('Venue updated:', result);
            const imageResult = await updateVendor({ vendorId: id || "", formData: formDataToSend }).unwrap();
            console.log('Portfolio updated:', imageResult);
            // Handle success (e.g., show a success message, redirect)
        } catch (error) {
            console.error('Failed to update venue:', error);
            // Handle error (e.g., show error message)
        }
        setIsLoading(false);
        setEditing(false);
        window.location.reload();
    };

    // Function to handle edit button click
    const handleEditClick = () => {
        // Populate the formData state with the current values
        setFormData({
            address: address || '',
            price: price || '',
            portfolio: portfolio || [],
            experience: experience || '',
            event_completed: event_completed || 0,
            willingToTravel: willingToTravel || false,
            summary: summary || '',
            packages: packages || { name: '', days: '', price: '', minAdvance: '' }
        });

        // Enter editing mode
        setEditing(true);
    };
    // console.log("Pack", packages)

    return (
        <div className="bg-white-500 rounded-lg p-8 mx-auto max-w-full mb-12">
            {isLoading && <Loader />}
            <div className="flex items-center justify-center">
                <div className="flex-grow">
                    {editing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-10 border-b pb-8">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                    className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                />
                            </div>

                            <div className="mb-4 pb-4">
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter price"
                                    className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                />
                            </div>
                            <div className="mb-4 pb-4">
                                <label
                                    htmlFor="portfolio"
                                    className="block mb-2 font-bold text-xl text-[#110069]"
                                >
                                    Portfolio:
                                </label>
                                <input
                                    type="file"
                                    id="portfolio"
                                    name="portfolio"
                                    onChange={handleImageChange}
                                    multiple
                                    className="w-3/4 rounded-md border-gray-300 py-2 text-lg bg-transparent text-[#110069] focus:outline-none focus:border-[#110069]"
                                />
                            </div>


                            <div className="mb-4 pb-4">
                                <input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={formData.experience || ""}
                                    onChange={handleInputChange}
                                    placeholder="Years of experience"
                                    className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                />
                            </div>

                            <div className="mb-4 pb-4">
                                <input
                                    type="text"
                                    id="event_completed"
                                    name="event_completed"
                                    value={formData.event_completed || ""}
                                    onChange={handleInputChange}
                                    placeholder="Events completed"
                                    className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                />
                            </div>

                            <div className="mb-4 pb-4">
                                <input
                                    type="checkbox"
                                    id="willingToTravel"
                                    name="willingToTravel"
                                    checked={formData.willingToTravel}
                                    onChange={handleInputChange}
                                    className="mr-2 text-[#110069]"
                                />
                                <label htmlFor="willingToTravel" className="text-lg text-[#110069]">
                                    Willing to Travel
                                </label>
                            </div>

                            <div className="mb-4 pb-4">
                                <textarea
                                    id="summary"
                                    name="summary"
                                    value={formData.summary || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter summary"
                                    className="w-full h-24 border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                />
                            </div>

                            <div className="mb-4 pb-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        id="packages.name"
                                        name="packages.name"
                                        value={formData?.packages?.name || ""}
                                        onChange={handleInputChange}
                                        placeholder="Package Name"
                                        className="w-1/4 border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        id="packages.days"
                                        name="packages.days"
                                        value={formData?.packages?.days || ""}
                                        onChange={handleInputChange}
                                        placeholder="Days"
                                        className="w-1/4 border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        id="packages.price"
                                        name="packages.price"
                                        value={formData?.packages?.price || ""}
                                        onChange={handleInputChange}
                                        placeholder="Price"
                                        className="w-1/4 border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        id="packages.minAdvance"
                                        name="packages.minAdvance"
                                        value={formData?.packages?.minAdvance || ""}
                                        onChange={handleInputChange}
                                        placeholder="Minimum Advance"
                                        className="w-1/4 border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="text-white bg-gray-700 hover:bg-black px-4 py-3 rounded-md text-l">
                                Update
                            </button>
                            <button onClick={handleCancelClick} className="ml-4 text-white bg-gray-500 hover:bg-black px-4 py-3 rounded-md text-l">
                                Cancel
                            </button>
                        </form>

                    ) : (
                        <>

                            <div className="mb-10">
                                <label
                                    htmlFor="address"
                                    className="block mb-4 font-bold text-xl text-[#110069]"
                                >
                                    Address:
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={address}
                                    readOnly
                                    placeholder=""
                                    className="w-3/4 text-lg bg-transparent text-[#110069] "
                                />
                            </div>

                            <div className="mb-10">
                                <label
                                    htmlFor="price"
                                    className="block mb-4 font-bold text-xl text-[#110069]"
                                >
                                    Price:
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={price}
                                    readOnly
                                    placeholder=""
                                    className="w-3/4 text-lg bg-transparent text-[#110069]"
                                />
                            </div>

                            <div className="mb-10">
                                <label
                                    htmlFor="experience"
                                    className="block mb-4 font-bold text-xl text-[#110069]"
                                >
                                    Years of Experience:
                                </label>
                                <input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={experience}
                                    readOnly
                                    placeholder=""
                                    className="w-3/4 text-lg bg-transparent text-[#110069]"
                                />
                            </div>

                            <div className="mb-10">
                                <label
                                    htmlFor="event_completed"
                                    className="block mb-4 font-bold text-xl text-[#110069]"
                                >
                                    Events Completed:
                                </label>
                                <input
                                    type="text"
                                    id="event_completed"
                                    name="event_completed"
                                    value={event_completed}
                                    readOnly
                                    placeholder=""
                                    className="w-3/4 text-lg bg-transparent text-[#110069]"
                                />
                            </div>

                            <div className="mb-10">
                                <label
                                    htmlFor="summary"
                                    className="block mb-4 font-bold text-xl text-[#110069]"
                                >
                                    Summary:
                                </label>
                                <textarea
                                    id="summary"
                                    name="summary"
                                    value={summary}
                                    readOnly
                                    placeholder=""
                                    className="w-3/4 text-lg bg-transparent text-[#110069]"
                                />
                            </div>

                            <div className="mb-10">
                                <label
                                    htmlFor="packages"
                                    className="block mb-4 font-bold text-xl text-[#110069]"
                                >
                                    Packages:
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        id="packages.name"
                                        name="packages.name"
                                        value={packages?.name}
                                        readOnly
                                        placeholder=""
                                        className="w-3/4 text-lg bg-transparent text-[#110069]"
                                    />
                                    <input
                                        type="text"
                                        id="packages.days"
                                        name="packages.days"
                                        value={packages?.days}
                                        readOnly
                                        placeholder=""
                                        className="w-3/4 text-lg bg-transparent text-[#110069]"
                                    />
                                    <input
                                        type="text"
                                        id="packages.price"
                                        name="packages.price"
                                        value={packages?.price}
                                        readOnly
                                        placeholder=""
                                        className="w-3/4 text-lg bg-transparent text-[#110069]"
                                    />
                                    <input
                                        type="text"
                                        id="packages.minAdvance"
                                        name="packages.minAdvance"
                                        value={packages?.minAdvance}
                                        readOnly
                                        placeholder=""
                                        className="w-3/4 text-lg bg-transparent text-[#110069]"
                                    />
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="font-bold text-lg text-[#110069]">Images:</h3>
                                <VenueImageGallery images={portfolio} />
                            </div>
                            <button
                                onClick={handleEditClick}
                                className="bg-gray-700 hover:bg-black text-white text-[#110069]  px-4 py-3 rounded-md text-l"
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsForm;
