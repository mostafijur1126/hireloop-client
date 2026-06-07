import { getjobsById } from "@/lib/api/jobs";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  CircleDollar,
  Calendar,
  Target,
  ListCheck,
  Gift,
  BarsAscendingAlignLeftArrowUp,
  Clock,
  Factory,
  ArrowLeft,
  CircleCheckFill,
} from "@gravity-ui/icons";
import Image from "next/image";

// Helper: format date to readable string
const formatDate = (dateString) => {
  if (!dateString) return "Not set";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper: format salary
const formatSalary = (amount) => {
  const num = parseInt(amount, 10);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US");
};

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getjobsById(id);

  if (!job) {
    notFound();
  }

  const {
    title,
    category,
    type,
    minSalary,
    maxSalary,
    currency,
    location,
    isRemoteOnly,
    deadline,
    responsibilities,
    requirements,
    benefits,
    status,
    companyName,
    companyLogo,
    createdAt,
  } = job;

  const minFormatted = formatSalary(minSalary);
  const maxFormatted = formatSalary(maxSalary);
  const formattedDeadline = formatDate(deadline);
  const formattedPosted = formatDate(createdAt?.$date || createdAt);
  const isActive = status === "active";
  const isExpired = new Date(deadline) < new Date();

  return (
    <div className="min-h-screen bg-[#09090b] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft
            width={18}
            height={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Back to jobs</span>
        </Link>

        {/* Main card */}
        <div className="bg-gradient-to-br from-[#18181b] to-[#1f1f24] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with company info */}
          <div className="p-6 sm:p-8 border-b border-[#27272a]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Company logo */}
                <div className="w-16 h-16 bg-black rounded-xl border-2 border-[#27272a] flex items-center justify-center overflow-hidden">
                  {companyLogo && companyLogo.trim() !== "" ? (
                    <Image
                      src={companyLogo}
                      alt={companyName}
                      height={200}
                      width={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {companyName?.charAt(0) || "C"}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Factory
                      width={14}
                      height={14}
                      className="text-[#71717a]"
                    />
                    <span className="text-[#a1a1aa] text-sm">
                      {companyName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-2">
                {isActive && !isExpired ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-full">
                    <CircleCheckFill width={12} height={12} />
                    Active
                  </span>
                ) : (
                  <span className="text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-full">
                    Closed
                  </span>
                )}
                {isRemoteOnly && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full">
                    <BarsAscendingAlignLeftArrowUp width={12} height={12} />
                    Remote
                  </span>
                )}
              </div>
            </div>

            {/* Quick meta row */}
            <div className="flex flex-wrap gap-4 mt-5 text-sm text-[#d4d4d8]">
              <div className="flex items-center gap-2">
                <Briefcase width={16} height={16} className="text-[#71717a]" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin width={16} height={16} className="text-[#71717a]" />
                <span>{isRemoteOnly ? "Remote Worldwide" : location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDollar
                  width={16}
                  height={16}
                  className="text-[#71717a]"
                />
                <span className="font-semibold text-white">
                  {minFormatted} - {maxFormatted} {currency}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar width={16} height={16} className="text-[#71717a]" />
                <span>Deadline: {formattedDeadline}</span>
              </div>
            </div>
          </div>

          {/* Job description sections */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Posted & Category info row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#202024] rounded-xl p-4 border border-[#27272a]">
              <div className="flex items-center gap-2">
                <Clock width={16} height={16} className="text-[#71717a]" />
                <span className="text-[#a1a1aa] text-sm">Posted on</span>
                <span className="text-white text-sm font-medium">
                  {formattedPosted}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target width={16} height={16} className="text-[#71717a]" />
                <span className="text-[#a1a1aa] text-sm">Category</span>
                <span className="text-white text-sm font-medium">
                  {category}
                </span>
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target width={18} height={18} className="text-[#3b82f6]" />
                <h2 className="text-lg font-semibold text-white">
                  Responsibilities
                </h2>
              </div>
              <div className="text-[#d4d4d8] leading-relaxed bg-[#202024]/40 rounded-xl p-4 border border-[#27272a]">
                <p>{responsibilities || "Not specified"}</p>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ListCheck width={18} height={18} className="text-[#ef4444]" />
                <h2 className="text-lg font-semibold text-white">
                  Requirements
                </h2>
              </div>
              <div className="text-[#d4d4d8] leading-relaxed bg-[#202024]/40 rounded-xl p-4 border border-[#27272a]">
                <p>{requirements || "Not specified"}</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Gift width={18} height={18} className="text-[#22c55e]" />
                <h2 className="text-lg font-semibold text-white">Benefits</h2>
              </div>
              <div className="text-[#d4d4d8] leading-relaxed bg-[#202024]/40 rounded-xl p-4 border border-[#27272a]">
                <p>{benefits || "Not specified"}</p>
              </div>
            </div>

            {/* Additional info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#202024] rounded-xl p-4 border border-[#27272a]">
              <div>
                <span className="text-[#a1a1aa] text-sm">Job Type</span>
                <p className="text-white font-medium">{type}</p>
              </div>
              <div>
                <span className="text-[#a1a1aa] text-sm">Location Type</span>
                <p className="text-white font-medium">
                  {isRemoteOnly ? "Remote" : "On-site"}
                </p>
              </div>
              <div>
                <span className="text-[#a1a1aa] text-sm">
                  Application Deadline
                </span>
                <p
                  className={`font-medium ${isExpired ? "text-red-400" : "text-white"}`}
                >
                  {formattedDeadline} {isExpired && "(Expired)"}
                </p>
              </div>
              <div>
                <span className="text-[#a1a1aa] text-sm">Public Status</span>
                <p className="text-white font-medium capitalize">
                  {job.isPublic ? "Public" : "Private"}
                </p>
              </div>
            </div>
          </div>

          {/* Apply button */}
          <div className="p-6 sm:p-8 border-t border-[#27272a] bg-[#202024]/20">
            <button
              disabled={!isActive || isExpired}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                !isActive || isExpired
                  ? "bg-[#27272a] text-[#71717a] cursor-not-allowed"
                  : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md hover:shadow-lg"
              }`}
            >
              {!isActive || isExpired
                ? "Application Closed"
                : "Apply for this position"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
