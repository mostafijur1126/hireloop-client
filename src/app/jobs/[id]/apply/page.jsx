import { getjobsById } from "@/lib/api/jobs";
import { getuserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/application";
import Link from "next/link";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiTrendingUp,
} from "react-icons/fi";
import { getPlanById } from "@/lib/api/plans";

const ApplyJobsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getuserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700">
          <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Access Restricted
          </h2>
          <p className="text-gray-300 mb-6">
            Only job seekers can apply for positions. Please sign in with a job
            seeker account to continue.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const plan = await getPlanById(user?.plan || "seeker_free");

  const job = await getjobsById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-gray-400 mb-4">
            The position you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/jobs"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Browse Jobs →
          </Link>
        </div>
      </div>
    );
  }

  const remainingApplications =
    plan.maxApplicationsPerMonth - applications.length;
  const percentageUsed =
    (applications.length / plan.maxApplicationsPerMonth) * 100;
  const hasReachedLimit = applications.length >= plan.maxApplicationsPerMonth;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href={`/jobs/${id}`}
          className="inline-flex items-center text-gray-400 hover:text-gray-200 mb-6 transition-colors group"
        >
          <FiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Job Details
        </Link>

        {/* Job Header Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl mb-8 overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-200">
              {job.company && <span className="text-lg">{job.company}</span>}
              {job.location && <span>📍 {job.location}</span>}
              {job.type && <span>💼 {job.type}</span>}
            </div>
          </div>
          {job.description && (
            <div className="px-6 py-4 border-b border-gray-700">
              <p className="text-gray-300 line-clamp-2">{job.description}</p>
            </div>
          )}
        </div>

        {/* Application Limit Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl mb-8 p-6 border border-gray-700">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                Application Limit
              </h2>
              <p className="text-gray-400 text-sm">
                {plan.name} Plan • {applications.length} of{" "}
                {plan.maxApplicationsPerMonth} used this month
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">
                  {remainingApplications} remaining
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  hasReachedLimit ? "bg-red-500" : "bg-blue-500"
                }`}
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-gray-400">
              {hasReachedLimit
                ? "You've reached your monthly application limit"
                : `You can apply for ${remainingApplications} more position${remainingApplications !== 1 ? "s" : ""} this month`}
            </p>
            <Link
              href="/plans"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all font-medium text-sm shadow-lg"
            >
              Upgrade Plan
              <FiTrendingUp className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Application Form Section */}
        {!hasReachedLimit ? (
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
            <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                Submit Your Application
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Please fill out the form below to apply for this position
              </p>
            </div>
            <div className="p-6">
              <JobApply applicant={user} job={job} />
            </div>
          </div>
        ) : (
          <div className="bg-yellow-900/30 border-l-4 border-yellow-500 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <FiAlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  Application Limit Reached
                </h3>
                <p className="text-yellow-200 mb-3">
                  You've used all {plan.maxApplicationsPerMonth} applications
                  for this month on the {plan.name} plan.
                </p>
                <p className="text-yellow-200 mb-4">
                  Upgrade to a higher plan to continue applying for more
                  positions and increase your chances of finding the perfect
                  job.
                </p>
                <Link
                  href="/plans"
                  className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                >
                  View Available Plans
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Helpful Tips */}
        <div className="mt-8 bg-blue-900/20 rounded-xl p-4 border border-blue-800/50">
          <div className="flex items-start gap-3">
            <FiCheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <p className="font-medium mb-1 text-blue-300">
                Pro Tips for a Successful Application:
              </p>
              <ul className="list-disc list-inside space-y-1 text-blue-200/80">
                <li>Tailor your resume to match the job requirements</li>
                <li>
                  Write a compelling cover letter highlighting your relevant
                  experience
                </li>
                <li>Double-check all information before submitting</li>
                <li>Follow up within a week if you don't hear back</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobsPage;
