import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/HomePage-SaleBanner-2.jpg";

const SaleBanner = () => {
  return (
    <section className="relative w-full h-[30vh] md:h-[80vh] border-b-2 border-b-gray-900 overflow-hidden shadow-lg">
      <div className="absolute inset-0 w-full h-full">
        <Link to="/products">
          <img
            src={Banner}
            alt="Sale Banner"
            className="w-full h-full object-center md:object-cover"
          />
        </Link>
      </div>
    </section>
  );
};

export default SaleBanner;
