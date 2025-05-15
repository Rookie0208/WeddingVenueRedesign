import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import InformationBanner from "../components/InformationBanner";
import Footer from "../components/Footer";
import { useRankedVenuesQuery } from "../redux/api/venue";
import { useGetAllBlogsQuery } from "../redux/api/blog";
import { useGetAllRealWeddingsQuery } from "../redux/api/realWeddings";
import VenueCard from "../components/VenueCard";
import SkeletonBlogCard from "../components/skeleton/Blog";
import SkeletonRealWeddingCard from "../components/skeleton/RealWedding";

import { Blog, RealWeddings } from "../types/types";
import { useGetAllCitiesQuery } from "../redux/api/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { cityStatus } from "../redux/reducer/auth";
import Universal from "../components/skeleton/Universal";
import WeddingCategoriesShort from "../components/WeddingCategShort";
// import FloatingMenu from "../components/FloatingMenu";
const images = [
  "/weddingz_pics/ourStory.jpg",
  "/weddingz_pics/home5.jpg",
  "/weddingz_pics/home6.jpg",
  "/weddingz_pics/home7.jpg",
  // "/weddingz_pics/home8.jpg",
  "/home5.jpg",
  "/home4.jpg",
];

const Home: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const venuesRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);


  const {
    data: venuesData,
    isLoading: isLoadingVenues,
    error: venuesError,
  } = useRankedVenuesQuery();
  const {
    data: blogData,
    isLoading: isLoadingBlogs,
    error: blogsError,
  } = useGetAllBlogsQuery("");
  const {
    data: realWeddingsData,
    isLoading: isLoadingRealWeddings,
    error: realWeddingsError,
  } = useGetAllRealWeddingsQuery();
  const { data: cityData } = useGetAllCitiesQuery();

  const dispatch = useDispatch<AppDispatch>();

  // setAllvenue(ven)
  // console.log(sumit)

  const venues = venuesData?.data || [];
  const blogs = blogData?.data.blog || [];
  const realWeddings = realWeddingsData?.data.realWeddings || [];
  const cities = cityData?.cities || [];

  const city = useSelector((state: RootState) => state?.auth?.city);
  console.log("data", city);
  // console.log("sokhi" , venues)

  // Handle error appropriately based on its type
  const errorMessageVenues = venuesError
    ? "status" in venuesError
      ? `Error: ${venuesError.status} - ${JSON.stringify(venuesError.data)}`
      : venuesError.message
    : null;

  const errorMessageBlogs = blogsError
    ? "status" in blogsError
      ? `Error: ${blogsError.status} - ${JSON.stringify(blogsError.data)}`
      : blogsError.message
    : null;

  const errorMessageRealWeddings = realWeddingsError
    ? "status" in realWeddingsError
      ? `Error: ${realWeddingsError.status} - ${JSON.stringify(
        realWeddingsError.data
      )}`
      : realWeddingsError.message
    : null;

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityValue = event.target.value;
    setSelectedCity(cityValue);
    dispatch(cityStatus(cityValue));

    // Scroll to the venues section
    if (cityValue && venuesRef.current) {
      venuesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log("cityy: ", selectedCity);

  return (
    <div>
      <NavBar />

      <section id="heroSection">
        {/* Carousel Section */}
        <div className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
          {/* Content Container */}
          <div className="relative flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="w-[1200px] text-center transform translate-y-24">
              <h1
                className="text-5xl font-bold font-marcellus text-white"
                style={{
                  textShadow:
                    "1px 1px 10px black, 0 0 4em black, 0 0 2em white",
                }}
              >
                Jaha mile perfect venue, vahi hai  
                <span className="text-[#d0d0d0]"> Weddingzvenue</span>
              </h1>
              <h2
                className="text-2xl font-light font-roboto text-white mt-4"
                style={{
                  textShadow:
                    "1px 1px 10px black, 0 0 4em black, 0 0 2em white",
                }}
              >
                Find the best wedding vendors with thousands of trusted reviews
              </h2>

              {/* City Selector and Search Button */}
              <div className="flex justify-center items-center space-x-0 mt-8">
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-1/2 md:w-1/3 px-4 py-2 border border-gray-300 bg-white bg-opacity-90 text-gray-900 focus:ring focus:ring-indigo-300 focus:outline-none transition duration-300"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                <button className="px-6 py-2 bg-[#1e1e1e] text-white border-0">
                  Search
                </button>
              </div>
              <div className="text-white-500 mt-4 text-lg font-roboto font-light tracking-wide" style={{
                  textShadow:
                    "1px 1px 10px black, 0 0 4em black, 0 0 2em white",
                }}>
              Wedding Photographers in IndiaBridal | Makeup Artists in IndiaWedding | Venues in India</div>
            </div>
          </div>
        </div>
      </section>

      <section id='topVenues'>
        <div className="pt-12 px-12 bg-white" ref={venuesRef}>
          {venues.filter((venue: any) =>
            selectedCity
              ? venue.city.toLowerCase() === selectedCity.toLowerCase()
              : true
          ) && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Top Rated Venues</h2>
              </div>
            )}
          {isLoadingVenues ? (
            <Universal />
          ) : venuesError ? (
            <div>{errorMessageVenues}</div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32">
                {venues
                  .filter((venue: any) =>
                    selectedCity
                      ? venue.city.toLowerCase() === selectedCity.toLowerCase()
                      : true
                  )
                  .map((venue: any, index: any) => (
                    <VenueCard
                      key={index}
                      venue={{
                        name: venue.businessName,
                        location: venue.city,
                        maxGuests: venue.guestCapacity,
                        images: venue.images,
                        id: venue._id,
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
          <div className="flex justify-center mt-8">
            <Link
              to="/venuelist"
              className="text-[#1b1b1b] hover:underline font-semibold"
            >
              View More Venues
            </Link>
          </div>
        </div>
      </section>

      {/* <section id='popularSearches'>
        <div className="flex justify-between items-center mb-6 px-12">
          <h2 className="text-2xl font-semibold">Popular Searches</h2>
        </div>
      </section> */}

      <section id="weddingCategories" className="py-16 bg-white">
        <WeddingCategoriesShort />
        <Link to="/vendor/AllVendors" className="text-[#1b1b1b] flex justify-center hover:underline font-semibold">
          View all Categories
        </Link>
      </section>

      <section id='InfoBanner'>
        <div>
          <InformationBanner />
        </div>
      </section>

      <section id='realWeddings'>
        <div className="py-12 px-12 bg-white">
          <div className="flex justify-between items-center my-6">
            <h2 className="text-2xl font-semibold">Real Wedding Highlights</h2>
          </div>
          {isLoadingRealWeddings ? (
            <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonRealWeddingCard key={index} />
              ))}
            </div>
          ) : realWeddingsError ? (
            <div className="text-center text-red-500">
              {errorMessageRealWeddings}
            </div>
          ) : realWeddings.length > 0 ? (
            <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {realWeddings.slice(0, 4).map((wedding: RealWeddings) => {
                const imageUrl =
                  wedding.images && wedding.images.length > 0
                    ? wedding.images[0]
                    : "/default-image.jpg";
                const contentPreview = wedding.content
                  ? wedding.content.substring(0, 190)
                  : "Details coming soon!";
                return (
                  <div
                    key={wedding._id}
                    className="bg-white border border-2 !border-pink-100 shadow-xl overflow-hidden relative group"
                  >
                    <img
                      src={imageUrl}
                      alt={wedding.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end justify-center p-5">
                      <h2 className="text-xl font-bold font-marcellus text-white group-hover:opacity-0">
                        {wedding.title}
                      </h2>
                    </div>
                    {/* <div className="absolute bottom-0 w-full p-5 bg-white bg-opacity-90 transform 
                            transition-transform duration-300 group-hover:-translate-y-2/3"
            > */}
                    .
                    <div
                      className="absolute inset-0 p-5 bg-white-500-a transform 
                transition-all duration-300 translate-y-full group-hover:translate-y-0 flex flex-col justify-start"
                    >
                      <h2 className="text-xl font-bold font-marcellus text-gray-800 mb-4">
                        {wedding.title}
                      </h2>
                      <p className="text-lg font-semibold text-gray-700 mt-2">
                        {contentPreview}...
                      </p>
                      <Link
                        to={`/realWedding/${wedding._id}`}
                        className="text-[#1b1b1b] hover:underline mt-3 inline-block"
                      >
                        Discover More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-700">
              Currently no weddings available. Stay tuned for updates!
            </p>
          )}
          <div className="flex justify-center mt-12">
            <Link to="/realWedding" className="text-[#1b1b1b] flex justify-center hover:underline font-semibold">
              View More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* <section id="gallery">
        <div className="flex justify-between items-center mb-6 px-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
        </div>
      </section> */}

      <section id="latestBlogs">
        <div className="py-12 px-12 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Latest Blogs</h2>
          </div>
          {isLoadingBlogs ? (
            <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlogCard key={index} />
              ))}
            </div>
          ) : blogsError ? (
            <div>{errorMessageBlogs}</div>
          ) : blogs.length > 0 ? (
            <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {blogs.slice(0, 4).map((blog: Blog) => {
                const imageUrl = Array.isArray(blog.images)
                  ? blog.images[0]
                  : blog.images || "/default-image.jpg";
                const contentPreview = blog.content
                  ? blog.content.substring(0, 150)
                  : "No content available";

                return (
                  <div
                    key={blog._id}
                    className="border border-gray-200 rounded-sm shadow-md hover:shadow-xl transition-shadow duration-200 bg-white overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="relative h-44">
                      <img
                        src={imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {contentPreview}...
                      </p>
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="text-sm font-medium text-[#04004c] hover:text-blue-800 mt-4 inline-block"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No blogs available</p>
          )}

          <div className="flex justify-center mt-8">
            <Link to="/blogs" className="text-[#1b1b1b] flex justify-center hover:underline font-semibold">
              View More Blogs
            </Link>
          </div>
        </div>
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
