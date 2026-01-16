import React from "react";
import Image from "next/image";
import Banner from "@/Components/Images/Banner.webp";

const HomeBanner = () => {
  return (
    <div className="relative w-full h-[40vh] md:h-screen overflow-hidden">
      {/* Background Image */}
      {/* Using object-cover to ensure the image fills the container, which is often better for banners. */}
      <Image
        src={Banner}
        alt="Home Banner"
        layout="fill"
        className="" // Use a theme color from your global CSS or tailwind.config.js
      />

      {/* Optional: Content Overlay */}
      {/* <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
        <h1 className="text-3xl font-semibold">Welcome to Our Store</h1>
      </div> */}
    </div>
  );
};

export default HomeBanner;
