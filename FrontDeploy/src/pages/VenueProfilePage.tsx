import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import VenueProfileCard from '../components/VenueProfileCard';
import ServiceDetailsFormVenue from '../components/ServiceDetailsFormVenue';
import { useGetVenueByIdQuery } from '../redux/api/venue';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';




// Corrected function declaration
const VenueProfilePage: React.FC = () => {

    // const dispatch: AppDispatch = useDispatch();
    // // const id = localStorage.getItem('userId') || "" ;
     
    // //  dispatch(setUserId(id));
    // //  console.log(id)

    const venueId = useSelector((state: RootState) => state?.auth?.user?._id);
    console.log("user" , venueId)

   
    const { data: venue } = useGetVenueByIdQuery(venueId  || "");
   
// import { useAllVenueQuery } from '../redux/api/venue';


   
    // console.log("updatevendor", updatevendor)
    const venueData = venue?.data?.venue;
    console.log("vendue data", venueData);

    

    return (
        <>
            <NavBar />
            <div className="p-2 bg-gradient-to-r from-[#1e1e1e] to-gray-800 text-white">
                <div className="text-3xl text-center font-semibold mt-3">{venueData?.businessName}</div>
            </div>

            <div className="flex justify-start bg-gradient-to-r from-[#1e1e1e] to-gray-800 text-white" style={{borderRadius: '12px' }}>
                <div className="w-1/2 lg:w-96 m-4 bg-white-500-a rounded-lg">
                    <VenueProfileCard 
                        yourName={venueData?.yourName} 
                        phone={venueData?.phone} 
                        profile = {venueData?.images ? venueData.images[0] : undefined} // Accessing the first image URL
                        id={venueId}
                        email={venueData?.email} 
                        // id={vendorid}
                    /> 
                </div>
                <div className='w-full'>
                    {/* <div className="max-w-full mx-auto px-4">
                        <VenueProfileInfo businessName={venueData?.businessName}  address={venueData?.address}/>
                    </div> */}
                    <div className="max-w-full mt-4 mx-auto px-4">
                      
                        <ServiceDetailsFormVenue 
                        phone={venueData?.phone} 
                        address={venueData?.address}
                        images={venueData?.images} 
                        featuresOfVenue={venueData?.featuresOfVenue} 
                        guestCapacity={venueData?.guestCapacity} 
                        howToReach={venueData?.howToReach} 
                        summary={venueData?.summary} 
                        venuePolicies={venueData?.venuePolicies} 
                        id={venueId}
                        venueType= {venueData?.venueType}
                        facilities= {venueData?.facilities}
                        foodPackages={venueData?.foodPackages}
                        />
                    </div>
                </div>
             </div> 
            <Footer />
        </>
    );
};

export default VenueProfilePage;
