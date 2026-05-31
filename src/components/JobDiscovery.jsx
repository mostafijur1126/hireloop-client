"use client";

import {
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaArrowRight,
} from "react-icons/fa";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    rate: "25-40/hour",
  },
  {
    id: 2,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    rate: "25-40/hour",
  },
  {
    id: 3,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    rate: "25-40/hour",
  },
  {
    id: 4,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    rate: "25-40/hour",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    rate: "25-40/hour",
  },
  {
    id: 6,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    rate: "25-40/hour",
  },
];

export default function JobDiscovery() {
  return (
    <section className="py-16 md:py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 ">
            <span className="text-indigo-700 text-sm font-semibold tracking-wide">
              SMART JOB DISCOVERY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-200 mb-4">
            The roles you'd never find by searching
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover opportunities tailored to your values and skills — from
            companies that truly care.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group bg-zinc-900 rounded-2xl   hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                {/* Job Title */}
                <h3 className="text-xl font-bold text-gray-200 mb-3">
                  {job.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {job.description}
                </p>

                {/* Details Row */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-indigo-400 text-xs" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-indigo-400 text-xs" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaDollarSign className="text-indigo-400 text-xs" />
                    <span>{job.rate}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full sm:w-auto mt-2 px-5 py-2.5 text-indigo-700 font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group-hover:gap-3">
                  <span>Apply Now</span>
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Jobs Link */}
        <div className="text-center mt-12 md:mt-16">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all">
            View all job openings
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}
