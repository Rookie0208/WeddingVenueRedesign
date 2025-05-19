import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
import VenueImageGallery from "../components/VenueImageGallery";
import VenuePriceCard from "../components/VenuePriceCard";
import VenueAboutCard from "../components/VenueAboutCard";
// import Carousel from "../components/Carousel";
import TermsAndPolicyCard from "../components/Terms";
import FAQSection from "../components/FaqSection";
import RelatedArticles from "../components/RelatedArticles";
import { useGetVenueByIdQuery } from "../redux/api/venue";

const VenueServicePage = () => {
  const { id } = useParams();
  const { pathname, search } = useLocation();
  const { data: venue } = useGetVenueByIdQuery(id ? id : "");
  const venueData = venue?.data?.venue;
  console.log(venueData);
  // const dummySummary= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut voluptate iste id magni ullam atque reprehenderit saepe ratione velit enim quidem eveniet tenetur aspernatur in, culpa, architecto tempore quod consequatur."
const price = venueData?.foodPackages?.match(/veg\s*[:= -]\s*([0-9]+)/i);
const veg = price?.[1] ?? venueData?.foodPackages?.match(/\d+/g)?.[0] ?? null;

const price2 = venueData?.foodPackages?.match(/nonveg\s*[:= -]\s*([0-9]+)/i);
const nonveg = price2?.[1] ?? venueData?.foodPackages?.match(/\d+/g)?.[1] ?? null;


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname, search]);


  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-28 mt-8">

        {/* Venue Main Image */}
        {venueData?.images?.[0] && (
          <div className="w-full">
            <img
              src={venueData?.images[0]}
              alt={`${venueData?.businessName} main`}
              className="w-full object-cover h-[400px] sm:h-[500px] lg:h-[600px]"
            />
            {/* <Carousel images = {venueData.images}/> */}
          </div>
        )}

        {/* Content Section */}
        <div className="container -mt-16 mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 px-4">
          {/* Left Section */}
          <div className="w-full lg:w-3/4 space-y-4">
            {/* Venue About Card */}
            <div className="bg-white shadow">
              <VenueAboutCard
                summary={venueData?.summary || "N/A"}
                name={venueData?.businessName}
                location={venueData?.city}
                rating={venueData?.rank}
                address={venueData?.address}
                photosCount={venueData?.images?.length}
                shareMessage={`Check out ${venueData?.businessName} in ${venueData?.city} – an exquisite venue perfect for weddings and celebrations with stunning architecture and top-notch facilities. See more details and photos here: https://weddingzvenue.in/"`}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/4 space-y-4 lg:sticky lg:top-20">
            {/* Price Card */}
            <div className="bg-white shadow">
              <VenuePriceCard
                name={venueData?.businessName}
                vegPrice={veg ? veg : "none"}
                nonVegPrice= {nonveg ? nonveg : "none"}
                contactNumber={venueData?.phone}
                email={venueData?.email}
                detailPackage={venueData?.foodPackages}
              />
            </div>
          </div>
        </div>
      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 px-4">
        {/* Left Section */}
        <div className="w-full">
          <div className="bg-white rounded-lg shadow p-2 mt-4">
          <VenueImageGallery images={venueData?.images} />
          </div>
        </div>
      </div>
      <div className="my-4 mx-4">
          <TermsAndPolicyCard />
        </div>
      {/* Related Articles */}
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
};

export default VenueServicePage;
