"use client";

import { useState } from "react";
import { FaCheckCircle, FaRocket, FaBuilding, FaCrown } from "react-icons/fa";

const PLANS_DATA = [
  {
    id: "starter",
    name: "Starter",
    title: "Start building your insights hub:",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: <FaRocket className="text-indigo-400 text-3xl" />,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    buttonText: "Choose This Plan",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    title: "Start building your insights hub:",
    monthlyPrice: 17,
    yearlyPrice: 153, // 25% off yearly
    icon: <FaBuilding className="text-indigo-400 text-3xl" />,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    buttonText: "Choose This Plan",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    title: "Start building your insights hub:",
    monthlyPrice: 99,
    yearlyPrice: 891, // 25% off yearly
    icon: <FaCrown className="text-indigo-400 text-3xl" />,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    buttonText: "Choose This Plan",
    popular: false,
  },
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "yearly"
  const yearlyDiscount = 25;

  const getDisplayPrice = (plan) => {
    if (billingCycle === "monthly") {
      return plan.monthlyPrice === 0 ? "Free" : `$${plan.monthlyPrice}`;
    } else {
      return plan.yearlyPrice === 0 ? "Free" : `$${plan.yearlyPrice}`;
    }
  };

  const getPriceSuffix = () =>
    billingCycle === "monthly" ? "/month" : "/year";

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full mb-4">
            <span className="text-indigo-700 text-sm font-semibold tracking-wide">
              PRICING
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-200 mb-4">
            Pay for the leverage, not the listings
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose the plan that fits your career journey — no hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Yearly
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {yearlyDiscount}%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS_DATA.map((plan) => {
            const displayPrice = getDisplayPrice(plan);
            const priceSuffix = getPriceSuffix();

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl bg-gray-800 p-6 shadow-sm border transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-gray-200 ring-2 ring-indigo-500/20"
                    : "border-gray-700 hover:border-indigo-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-50 rounded-xl">{plan.icon}</div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">{plan.title}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    {displayPrice}
                  </span>
                  {displayPrice !== "Free" && (
                    <span className="text-gray-400 text-base font-medium ml-1">
                      {priceSuffix}
                    </span>
                  )}
                  {billingCycle === "yearly" && plan.yearlyPrice > 0 && (
                    <div className="text-sm text-green-400 mt-1">
                      Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} yearly
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <FaCheckCircle className="text-indigo-400 text-sm mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]">
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
