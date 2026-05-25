"use client";

import Image from "next/image";
import { Briefcase, Factory, Persons, Star } from "@gravity-ui/icons";

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
    <section className="relative overflow-hidden bg-black px-4 py-24">
      {/* Globe Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/globe.png"
          alt="Globe"
          width={1200}
          height={1200}
          className="object-contain opacity-80"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
            Assisting over 15,000 job seekers
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:border-violet-500/30 hover:bg-white/[0.05]"
            >
              {/* Icon */}
              <div className="mb-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                {item.icon}
              </div>

              {/* Number */}
              <h3 className="text-5xl font-bold tracking-tight text-white">
                {item.value}
              </h3>

              {/* Label */}
              <p className="mt-4 text-sm text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
