import Image from "next/image";
import React from "react";
import { FaArrowRight, FaTags } from "react-icons/fa";

const NextRole = () => {
  return (
    <section className="relative  py-20 md:py-28">
      {/* Background Image - full screen */}
      <div className="absolute h-full w-full inset-0 z-0">
        <Image
          src="/images/cta-bg.png"
          alt="Career opportunity background"
          fill
          className="object-cover"
          priority
        />
        {/* Blue overlay - as in the photo */}
        <div className="absolute inset-0 bg-blue-600/60 mix-blend-multiply" />
        {/* Optional: subtle gradient to soften edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.2]">
          <span className="inline-block">Your next role is</span>{" "}
          <span className="inline-block bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            already looking for you
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-indigo-700 hover:bg-gray-100 font-semibold rounded-xl transition-all duration-200 shadow-lg transform hover:scale-[1.02]">
            <span>Create a free account</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-200">
            <FaTags className="text-sm" />
            <span>View pricing</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NextRole;
