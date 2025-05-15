
import VendorProfileCard from '../components/VendorProfileCard';
import ServiceDetailsForm from '../components/ServiceDetailsForm';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
// import VendorProfileInfo from '../components/VendorProfileInfo';
import { useGetVendorByIdQuery } from '../redux/api/vendor';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';





// Corrected function declaration
const VendorProfilePage: React.FC = () => {



  const vendorid = useSelector((state: RootState) => state?.auth?.user?._id);
  console.log("user", vendorid)


  const { data: vendor } = useGetVendorByIdQuery(vendorid || "");

  // console.log("updatevendor", updatevendor)
  const vendorData = vendor?.data?.vendor;
  console.log("vendor data", vendor);

  return (
    <>
      <NavBar />
      <div className="p-2 bg-gradient-to-r from-[#1e1e1e] to-gray-800 text-white">
        <div className="text-3xl text-center font-semibold mt-3">{vendorData?.businessName}</div>
      </div>

      <div className="flex justify-start bg-gradient-to-r from-[#1e1e1e] to-gray-800 text-white" style={{ borderRadius: '12px' }}>

        <div className="w-1/2 lg:w-96 m-4 bg-white bg-opacity-90 rounded-lg">

          <VendorProfileCard
            name={vendorData?.name}
            phone={vendorData?.phone}
            email={vendorData?.email}
            id={vendorid}
          />


        </div>

        {/* Right Panel */}
        <div className="w-full">
          <div className="max-w-full mt-4 mx-auto px-4">
            {/* Service Details Form */}
            <ServiceDetailsForm
              address={vendorData?.address}
              price={vendorData?.packages?.price}
              portfolio={vendorData?.portfolio}
              experience={vendorData?.experience}
              event_completed={vendorData?.event_completed}
              willingToTravel={vendorData?.willingToTravel}
              summary={vendorData?.summary}
              packages={vendorData?.packages}
              id={vendorid}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VendorProfilePage;
