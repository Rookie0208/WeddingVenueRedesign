
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
import PriceCard from "../components/PriceCard";
import VendorInfo from "../components/VendorInfo";
import TermsAndPolicyCard from "../components/Terms";
import RelatedArticles from "../components/RelatedArticles";
import { useParams } from "react-router-dom";
import { useGetVendorByIdQuery } from "../redux/api/vendor";
import VenueImageGallery from "../components/VenueImageGallery";
import FAQSection from "../components/FaqSection";
import Loader from "../components/skeleton/Loader";

interface Params {
  [key: string]: string | undefined;
}
function VendorServicePage() {
  const { _id } = useParams<Params>();
  const id = _id;

  const {
    data: vendor,
    error,
    isLoading,
  } = useGetVendorByIdQuery(id ? id : "");

  const vendorData = vendor?.data.vendor;
  // const vendorData = dummyData;
  console.log("vendor:", vendor);

  if (!id) {
    return <div>No ID provided.</div>;
  }

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    if ("message" in error) {
      // Handle SerializedError
      return <div>Error: {error.message}</div>;
    }
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-10 mt-8">
        {/* Hero Section */}
        {vendorData?.portfolio?.[0] && (
          <div className="w-full">
            <img
              src={vendorData?.portfolio[0]}
              alt={`${vendorData.businessName} main`}
              className="w-full object-cover h-[400px] sm:h-[500px] lg:h-[600px]"
            />
            {/* <Carousel images = {venueData.images}/> */}
          </div>
        )}

        {/* content Section  */}
        <div className="container -mt-16 mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 ">
          {/* left section  */}
          <div className="w-full lg:w-3/4 space-y-4">
            <div className="bg-white shadow">
              <VendorInfo
                name={vendorData?.name}
                location={vendorData?.city}
                reviews={vendorData?.review?.length || 0} 
                address={vendorData?.address}
                photosCount={vendorData?.portfolio?.length}
                shareMessage={`Check out ${vendorData?.businessName} in ${vendorData?.city} – a perfect ${vendorData?.type_Of_Business} for weddings and celebrations with great Services. See more details and photos here: https://weddingzvenue.in/"`}
                summary={vendorData?.summary}
                businessType={vendorData?.type_Of_Business}
              />
            </div>
          </div>
          {/* right section  */}
          <div className="w-full lg:w-1/4 space-y-4 lg:sticky lg:top-20">
            {/* Price Card */}
            <div className="bg-white shadow">
              <PriceCard
                name={vendorData?.businessName}
                price={vendorData?.packages?.price || "N/A"}
                contactNumber={vendorData?.phone}
                email={vendorData?.email}
                detailPackage={
                  vendorData?.packages
                    ? {
                        name: vendorData.packages.name || '',
                        days: vendorData.packages.days || '',
                        price: vendorData.packages.price || '',
                        minAdvance: vendorData.packages.minAdvance || '',
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="container mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 px-4">
          {/* Left Section */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow p-2 mt-4">
              <VenueImageGallery images={vendorData?.portfolio} />
            </div>
          </div>
        </div>
        <div className="my-4">
          <TermsAndPolicyCard />
        </div>
        <div className="container mx-auto px-4 mt-4">
          <RelatedArticles />
        </div>
      </div>
      {/* FAQ Section */}
      <div className="container mx-auto px-4 mt-8">
        <FAQSection />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default VendorServicePage;
