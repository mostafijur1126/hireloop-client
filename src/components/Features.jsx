"use client";

import {
  FaSearch,
  FaChartLine,
  FaBuilding,
  FaBookmark,
  FaMousePointer,
  FaFileAlt,
  FaBrain,
  FaRocket,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: <FaSearch className="text-indigo-400 text-2xl" />,
  },
  {
    id: 2,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: <FaChartLine className="text-indigo-400 text-2xl" />,
  },
  {
    id: 3,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: <FaBuilding className="text-indigo-400 text-2xl" />,
  },
  {
    id: 4,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: <FaBookmark className="text-indigo-400 text-2xl" />,
  },
  {
    id: 5,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: <FaMousePointer className="text-indigo-400 text-2xl" />,
  },
  {
    id: 6,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: <FaFileAlt className="text-indigo-400 text-2xl" />,
  },
  {
    id: 7,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: <FaBrain className="text-indigo-400 text-2xl" />,
  },
  {
    id: 8,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: <FaRocket className="text-indigo-400 text-2xl" />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 rounded-full mb-4">
            <span className="text-indigo-300 text-sm font-semibold tracking-wide">
              FEATURES JOB
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Powerful tools and insights to help you land your dream job faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-4 w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional CTA / footer note */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-400 text-sm">
            Join thousands of job seekers who found success with HireLoop
          </p>
        </div>
      </div>
    </section>
  );
}
