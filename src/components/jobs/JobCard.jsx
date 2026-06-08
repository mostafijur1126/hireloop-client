import React from "react";
import { Card, Avatar, Button, Chip } from "@heroui/react";
import {
  MapPin,
  Briefcase,
  CircleDollar,
  Calendar,
  ArrowUpRight,
  Target,
  ListCheck,
  Gift,
  Clock,
  BarsDescendingAlignCenter,
} from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

// Helper functions
function getJobId(id) {
  if (!id) return "";
  if (typeof id === "string") return id;
  if (id.$oid) return id.$oid;
  return "";
}

function formatSalary(amount) {
  const num = typeof amount === "string" ? parseInt(amount, 10) : amount;
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US");
}

function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s) ago`;
  return `Posted on ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

function getDaysLeft(deadline) {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);

  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    days: diffDays,
    isExpired: diffDays < 0,
  };
}

export default function JobCard({ job }) {
  // Destructure job data
  const {
    title,
    category,
    type,
    minSalary,
    maxSalary,
    currency,
    location,
    isRemoteOnly = false,
    deadline,
    responsibilities,
    requirements,
    benefits,
    status,
    companyName,
    companyLogo,
    createdAt,
  } = job;

  const jobId = getJobId(job._id);

  // Posted date
  let postedDate = "";
  if (createdAt) {
    const dateValue = createdAt.$date || createdAt;
    postedDate = getRelativeTime(dateValue);
  }

  // Deadline info
  const deadlineObj = getDaysLeft(deadline);
  const formattedDeadline = new Date(deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const displayLocation = isRemoteOnly ? "Remote Worldwide" : location;
  const locationIcon = isRemoteOnly ? (
    <BarsDescendingAlignCenter
      className="text-[#71717a]"
      width={16}
      height={16}
    />
  ) : (
    <MapPin className="text-[#71717a]" width={16} height={16} />
  );

  const minFormatted = formatSalary(minSalary);
  const maxFormatted = formatSalary(maxSalary);
  const salaryDisplay = `${minFormatted} - ${maxFormatted} ${currency}`;

  const responsibilitiesText = responsibilities || "Not specified";
  const requirementsText = requirements || "Not specified";
  const benefitsText = benefits || "Not specified";

  const statusColor = status === "active" ? "success" : "default";
  const isExpired = deadlineObj.isExpired;

  return (
    <Card className="group max-w-[480px] w-full bg-gradient-to-br from-[#18181b] to-[#1f1f24] border border-[#27272a] text-[#ededed] p-5 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#3f3f46] hover:-translate-y-1">
      {/* Header: Logo, Company, Category, Status */}
      <Card.Header className="flex items-start justify-between gap-4 p-0 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-full bg-black text-white border-2 border-[#27272a] font-bold text-lg flex items-center justify-center shadow-inner overflow-hidden">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <span>{title?.charAt(0)?.toUpperCase()}</span>
            )}
          </div>
          <div>
            <Card.Title className="text-xl font-bold text-white tracking-tight m-0 leading-tight">
              {companyName || "Company"}
            </Card.Title>
            <div className="flex items-center gap-2 mt-0.5">
              <Card.Description className="text-xs text-[#a1a1aa] font-medium">
                {category}
              </Card.Description>
              {postedDate && (
                <div className="flex items-center gap-1 text-[10px] text-[#71717a]">
                  <Clock width={10} height={10} />
                  <span>{postedDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Chip
            size="sm"
            variant="flat"
            color={statusColor}
            className="text-[10px] font-bold tracking-wider uppercase"
          >
            {status}
          </Chip>
          {isRemoteOnly && (
            <Chip
              size="sm"
              variant="bordered"
              className="text-[9px] bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]"
            >
              Remote
            </Chip>
          )}
        </div>
      </Card.Header>

      {/* Job Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[#a1a1aa]">
            <Briefcase className="text-[#71717a]" width={14} height={14} />
            <span>{type}</span>
          </div>
        </div>
      </div>

      {/* Key Information Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-[#d4d4d8] bg-[#202024]/40 p-3 rounded-xl border border-[#27272a] mb-4">
        <div className="flex items-center gap-2.5">
          {locationIcon}
          <span className="truncate">{displayLocation}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <CircleDollar className="text-[#71717a]" width={16} height={16} />
          <span className="font-semibold text-white">{salaryDisplay}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Calendar className="text-[#71717a]" width={16} height={16} />
          <div className="flex flex-col">
            <span>Until {formattedDeadline}</span>
            {!isExpired && deadlineObj.days <= 7 && (
              <span className="text-[10px] text-[#eab308]">
                {deadlineObj.days} day(s) left
              </span>
            )}
            {isExpired && (
              <span className="text-[10px] text-[#ef4444]">Expired</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Target className="text-[#71717a]" width={16} height={16} />
          <span className="capitalize">{category}</span>
        </div>
      </div>

      {/* Role Details (Responsibilities, Requirements, Benefits) */}
      <div className="flex flex-col gap-3 text-xs text-[#a1a1aa] bg-[#202024] p-3.5 rounded-xl border border-[#27272a] mb-4">
        <div className="flex items-start gap-2">
          <Target
            className="text-[#3b82f6] mt-0.5 shrink-0"
            width={14}
            height={14}
          />
          <div>
            <strong className="text-white text-xs">Key Responsibilities</strong>
            <p className="mt-0.5 leading-relaxed">{responsibilitiesText}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ListCheck
            className="text-[#ef4444] mt-0.5 shrink-0"
            width={14}
            height={14}
          />
          <div>
            <strong className="text-white text-xs">Requirements</strong>
            <p className="mt-0.5 leading-relaxed">{requirementsText}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Gift
            className="text-[#22c55e] mt-0.5 shrink-0"
            width={14}
            height={14}
          />
          <div>
            <strong className="text-white text-xs">Benefits</strong>
            <p className="mt-0.5 leading-relaxed">{benefitsText}</p>
          </div>
        </div>
      </div>

      {/* Footer Action Button */}
      <Card.Footer className="p-0">
        <Link
          href={isExpired || status !== "active" ? "#" : `/jobs/${jobId}`}
          className={`w-full h-11 flex items-center justify-center gap-2 rounded-lg font-bold shadow-md transition-all duration-200
    ${
      isExpired || status !== "active"
        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed pointer-events-none"
        : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
    }`}
        >
          <span>
            {isExpired ? "Application Closed" : "Apply for this Position"}
          </span>

          {!isExpired && status === "active" && (
            <ArrowUpRight width={16} height={16} />
          )}
        </Link>
      </Card.Footer>
    </Card>
  );
}
