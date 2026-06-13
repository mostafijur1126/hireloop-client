import { getApplicationsByApplicant } from "@/lib/api/application";
import { getuserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { FiBriefcase, FiMapPin } from "react-icons/fi";

// Helper: format date as "X hours/days/weeks ago"
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMins < 60)
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
};

// Helper: get status badge style
const getStatusBadge = (status) => {
  const styles = {
    Applied: "bg-blue-900/50 text-blue-300 border border-blue-700",
    Review: "bg-yellow-900/50 text-yellow-300 border border-yellow-700",
    Shortlisted: "bg-green-900/50 text-green-300 border border-green-700",
    Rejected: "bg-red-900/50 text-red-300 border border-red-700",
    Offered: "bg-purple-900/50 text-purple-300 border border-purple-700",
  };
  return styles[status] || "bg-gray-700 text-gray-300 border border-gray-600";
};

const ApplicationsPage = async () => {
  const user = await getuserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  const applications = await getApplicationsByApplicant(user.id);
  console.log(applications);

  // For demo purposes, add mock job type/location and status.
  // In a real app, these fields would come from the API.
  const enhancedApps = applications.map((app, idx) => ({
    ...app,
    jobType: idx % 2 === 0 ? "Full-time" : "Contract",
    jobLocation:
      idx % 3 === 0 ? "Remote" : idx % 3 === 1 ? "Hybrid" : "On-site",
    status: ["Applied", "Review", "Shortlisted", "Rejected", "Offered"][
      idx % 5
    ],
  }));

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            My Applications
          </h1>
          <p className="text-gray-400">Track all the jobs you've applied for</p>
        </div>

        {/* Applications Table */}
        {enhancedApps.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-12 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBriefcase className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No applications yet
            </h3>
            <p className="text-gray-400 mb-6">
              You haven't applied to any jobs. Start exploring opportunities!
            </p>
            <Link
              href="/dashboard/seeker/jobs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800/80 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Job Title
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Company
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Applied
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {enhancedApps.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      {/* Job Title with type & location */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">
                          {app.jobTitle}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                          <span>{app.jobType}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <FiMapPin className="w-3 h-3" />
                            {app.jobLocation}
                          </span>
                        </div>
                      </td>
                      {/* Company */}
                      <td className="px-6 py-4 text-gray-300">
                        {app.companyName}
                      </td>
                      {/* Applied Date */}
                      <td className="px-6 py-4 text-gray-400">
                        {getRelativeTime(app.createdAt)}
                      </td>
                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            app.status,
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      {/* Action Button */}
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/seeker/applications/${app._id}`}
                          className="inline-flex items-center px-4 py-1.5 rounded-md bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 transition-colors"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
