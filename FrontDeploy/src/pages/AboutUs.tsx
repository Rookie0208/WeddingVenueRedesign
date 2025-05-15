import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";
import FAQSection from '../components/FaqSection';

const AboutUs: React.FC = () => {
  const localVideos = [
    "/aboutus1.mp4", // Update these paths to your actual video file paths
    "/aboutus2.mp4",
    "/aboutus3.mp4",
  ];

  return (
    <div className="w-100">
      <NavBar />
      <div className="bg-grey-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="title">
            <div
              id="banner"
              className="lg:text-center bg-[url('/weddingz_pics/mainBG.jpg')] h-64 flex place-items-center place-content-center bg-cover"
            >
              <h2 className="text-5xl font-marcellus font-semibold text-white">
                About Us
              </h2>
            </div>
            <div id="title">
              <p className="font-roboto mt-24 text-center text-sm text-black uppercase">
                Welcome to Weddingz Venue
              </p>
              <p className="font-marcellus mt-4 text-center text-4xl text-black font-bold">
                Dedicated to helping you create the wedding of your dreams
              </p>
              <p className="font-roboto mt-4 text-center text-lg text-black">
                Connecting you with the best venues and vendors in the industry
              </p>
            </div>
          </section>

          <section id="info">
  <div className="mt-24 flex flex-col items-center px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row w-full gap-4">
      
      {/* First Column */}
      <div className="flex flex-col w-full lg:w-1/3 border border-white border-3">
        <div className="bg-[#1b1b1b] p-4 flex-1 flex flex-col justify-center">
          <h2 className="text-white font-marcellus text-2xl sm:text-3xl font-bold tracking-wider">
            Our Mission
          </h2>
          <p className="text-[#e2e2e2] mt-4 text-sm sm:text-base font-roboto">
            Our mission is to create unforgettable weddings by pairing couples
            with top vendors. We ensure every love story is beautifully celebrated
            through personalized service and attention to detail.
          </p>
        </div>
        <div className="flex-1 h-64 sm:h-72 overflow-hidden">
          <img
            src="/weddingz_pics/ourMissionPic.jpg"
            alt="Our Mission"
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
      </div>

      {/* Second Column */}
      <div className="w-full lg:w-1/3 border border-white border-3">
        <div className="h-64 sm:h-96 overflow-hidden">
          <img
            src="about_us_1.jpg"
            alt="Center"
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
      </div>

      {/* Third Column */}
      <div className="flex flex-col w-full lg:w-1/3 border border-white border-3">
        <div className="bg-[#1b1b1b] p-4 flex-1 flex flex-col justify-center">
          <h2 className="text-white font-marcellus text-2xl sm:text-3xl font-bold tracking-wider">
            Our Story
          </h2>
          <p className="text-[#e2e2e2] mt-4 text-sm sm:text-base font-roboto">
            Founded in 2015 by Abdul Kareem, we’ve grown from a small startup
            into a trusted leader in wedding vendor services. With a dedicated
            team and top-tier vendors, we bring couples' dream weddings to life
            through excellence and personalized service.
          </p>
        </div>
        <div className="flex-1 h-64 sm:h-72 overflow-hidden">
          <img
            src="/weddingz_pics/ourStory.jpg"
            alt="Our Story"
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
      </div>

      <div className="bg-[#1b1b1b] mt-12 py-20">
        <div>
          <section className="founders-note bg-white py-12">
            <div className="w-11/12 sm:w-3/5 md:w-2/5 mx-auto text-center py-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105">
              {/* Title: Founder's Note */}
              <h2 className="font-marcellus text-4xl md:text-5xl font-bold text-black mb-4">
                Founder's Note
              </h2>

              {/* Founder name and title */}
              <div className="text-xl font-medium font-inter mb-6 text-[#1c1c1c]">
                <p></p>
              </div>

              {/* Circular founder's photo */}
              <div className="mb-8">
                {/* <img
                  src="/founderandCEO.jpg"
                  alt="Founder Abdul Kareem"
                  className="w-40 h-40 sm:w-64 sm:h-64 rounded-full mx-auto object-cover border-4 border-pink-500 shadow-md transition-transform duration-300 hover:scale-110"
                /> */}
              </div>

              {/* Founder's description */}
              <div className="text-gray-700">
                <p className="mb-2 px-4 text-center text-lg font-roboto">
                  A visionary leader driven by the passion to make every wedding truly special. 
                  With a firm belief that every couple deserves a celebration that reflects their unique love story, 
                  we are dedicated to bringing that vision to life through exceptional service and meticulous attention to detail.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-grey-100 py-16">
        <div className="mt-8">
          <section id="videos">
            <div>
              <h2 className="font-marcellus text-4xl font-semibold text-gray-900 text-center mb-8">
                Media
              </h2>
            </div>

            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {localVideos.map((videoPath, index) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <video className="w-full h-80 object-cover" controls>
                      <source src={videoPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div>
        <FAQSection/>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
