import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const RelatedArticles: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1e1e1e] to-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-8">
          Discover the Best Venues on Our Platform
        </h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied users and experience top-notch content, insights, and more with our platform. Explore exclusive offers and become part of a thriving community today!
        </p>
        <Link 
          to="/aboutus1"
          className="inline-flex items-center bg-white text-black hover:bg-gray-200 font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          About Weddingz Venue
          <FaArrowRight className="ml-3" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedArticles;
