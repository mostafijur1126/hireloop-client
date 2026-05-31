"use client";

import Image from "next/image";
import {
  Briefcase,
  Factory,
  FileMagnifier,
  Persons,
  Star,
} from "@gravity-ui/icons";
import {
  FaBriefcase,
  FaCodeBranch,
  FaMapMarkerAlt,
  FaMicrochip,
  FaSearch,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: <Briefcase className="h-5 w-5 text-white" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      icon: <Factory className="h-5 w-5 text-white" />,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: <Persons className="h-5 w-5 text-white" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: <Star className="h-5 w-5 text-white" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Globe Background - Full Screen */}
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        <Image
          src="/images/globe.png"
          alt="Globe"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Heading Section */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Stats Badge */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full shadow-lg">
              <span className="text-white font-black text-xl md:text-2xl">
                50,000+
              </span>
              <span className="text-gray-200 font-semibold text-sm md:text-base tracking-wide">
                NEW JOBS THIS MONTH
              </span>
              <FileMagnifier className="text-orange-400 ml-1 text-sm md:text-base" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-white mb-4 md:mb-6">
            Find Your Dream Job Today
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          {/* Search Inputs Group */}
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-gray-800/50 p-2 rounded-2xl border border-gray-700">
              {/* Job Title Input */}
              <div className="relative flex-1">
                <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base" />
                <input
                  type="text"
                  placeholder="Job title, skill or company"
                  className="w-full h-10 md:h-12 pl-11 pr-4 rounded-xl  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400"
                />
              </div>

              {/* Location Input */}
              <div className="relative flex-1">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base" />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  className="w-full h-10 md:h-12 pl-11 pr-4 rounded-xl  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400"
                />
              </div>

              {/* Search Button */}
              <button className="h-10 md:h-12 px-4 md:px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center ">
                <FaSearch className="text-sm md:text-base" />
              </button>
            </div>
          </div>

          {/* Trending Positions */}
          <div className="mt-6 md:mt-8">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <span className="text-sm font-medium  text-gray-400 ">
                Trending Position
              </span>
              {/* <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent hidden sm:block"></div> */}
              <div className="group flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-sm   rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:border-indigo-300 cursor-default">
                {/* <FaBriefcase className="text-indigo-500 text-sm group-hover:scale-110 transition-transform" /> */}
                <span className="text-gray-400 font-medium text-sm md:text-base">
                  Product Designer
                </span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-sm   rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:border-indigo-300 cursor-default">
                {/* <FaBriefcase className="text-indigo-500 text-sm group-hover:scale-110 transition-transform" /> */}
                <span className="text-gray-400 font-medium text-sm md:text-base">
                  Product Designer
                </span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-sm   rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:border-indigo-300 cursor-default">
                {/* <FaBriefcase className="text-indigo-500 text-sm group-hover:scale-110 transition-transform" /> */}
                <span className="text-gray-400 font-medium text-sm md:text-base">
                  Product Designer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subheading */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white">
            Assisting over 15,000 job seekers
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-6 transition duration-300 hover:border-violet-400/50 hover:bg-white/20"
            >
              <div className="mb-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                {item.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {item.value}
              </h3>
              <p className="mt-4 text-sm text-gray-200">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
