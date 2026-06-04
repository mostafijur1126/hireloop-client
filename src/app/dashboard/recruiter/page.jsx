"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { FiFileText, FiZap } from "react-icons/fi";
import MetricCard from "@/components/dashbord/MetricCard";
import { FaCheckCircle, FaUsers } from "react-icons/fa";

const RecruiterDashbordHomepage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen text-zinc-400">
        Loading...
      </div>
    );
  }

  const user = session?.user;

  // Mock data representing the stats in image_6b639f.png
  const stats = [
    {
      id: "total-posts",
      title: "Total Job Posts",
      value: "48",
      icon: FiFileText,
    },
    {
      id: "total-applicants",
      title: "Total Applicants",
      value: "1,284",
      icon: FaUsers,
    },
    {
      id: "active-jobs",
      title: "Active Jobs",
      value: "18",
      icon: FiZap,
    },
    {
      id: "closed-jobs",
      title: "Jobs Closed",
      value: "32",
      icon: FaCheckCircle,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 text-white">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-100">
          Welcome back, {user?.name || "Recruiter"}
        </h1>
      </div>

      {/* Grid Dashboard Metric Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <MetricCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashbordHomepage;
