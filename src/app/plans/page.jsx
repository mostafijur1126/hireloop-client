// app/pricing/page.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FiCheck,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("seeker");

  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile",
        "Email alerts",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "$19",
      period: "/month",
      description: "For active job seekers",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
      cta: "Start Pro",
      highlighted: true,
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "$39",
      period: "/month",
      description: "Maximum visibility",
      features: [
        "Everything in Pro",
        "Unlimited applications",
        "Profile boost to recruiters",
        "Early access to new jobs",
        "Priority support",
      ],
      cta: "Go Premium",
      highlighted: false,
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      id: "recruiter_free",
      price: "$0",
      period: "forever",
      description: "Great for first-year hiring",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Growth",
      id: "recruiter_growth",
      price: "$49",
      period: "/month",
      description: "For scaling teams",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking",
        "Basic analytics",
        "Email support",
      ],
      cta: "Start Growth",
      highlighted: true,
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "$149",
      period: "/month",
      description: "Full recruitment suite",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings",
        "Team collaboration",
        "Custom branding",
        "Priority support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const currentPlans = activeTab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include core
            features to help you succeed.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 p-1 rounded-xl inline-flex shadow-lg border border-gray-700">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "seeker"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <FiUsers className="w-4 h-4" />
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "recruiter"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <FiBriefcase className="w-4 h-4" />
              For Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300 ${
                plan.highlighted
                  ? "ring-2 ring-blue-500 shadow-2xl"
                  : "border border-gray-700"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  {plan.name === "Premium" && (
                    <FiStar className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="plan_id" value={plan.id} />
                    <section>
                      <button
                        type="submit"
                        role="link"
                        className={`w-full py-3 rounded-lg font-medium transition-all ${
                          plan.highlighted
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg"
                            : "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
                        }`}
                      >
                        Checkout
                      </button>
                    </section>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            All prices are in USD. No hidden fees. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
