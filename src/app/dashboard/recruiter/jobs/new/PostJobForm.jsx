"use client";

import React, { useState } from "react";
import { Input, Switch, Button, Card, Toast, toast } from "@heroui/react";
import {
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiFileText,
} from "react-icons/fi";
import { createjob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobForm({ companydata }) {
  // console.log(companydata);
  // Mock Fetching Recruiter Company (Auto-filled on dashboard state init)
  // const [companydata] = useState({
  //   name: "Acme Corp",
  //   isApproved: true,
  //   id: "co_12345",
  // });

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    isRemoteOnly: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const [loading, setLoading] = useState(false);

  // Constants
  const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Sales",
    "Finance",
    "Product Management",
  ];
  const jobTypes = [
    "Full-time",
    "Part-time",
    "Remote",
    "Contract",
    "Internship",
  ];
  const currencies = ["USD", "EUR", "GBP", "BDT", "INR"];

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!companydata.isApproved) {
    //   alert(
    //     "Your company profile must be approved before you can post public jobs.",
    //   );
    //   return;
    // }

    setLoading(true);

    const payload = {
      ...formData,
      companyId: companydata._id,
      companyName: companydata.name,
      companyLogo: companydata.logoUrl,
      status: "active", // Required per layout spec
      isPublic: true, // Required per layout spec
    };
    const res = await createjob(payload);
    if (res.insertedId) {
      toast.success("Job Posted successfully!");
      e.target.reset();
      redirect("/dashboard/recruiter/jobs");
    }
    console.log("Submitting Job Post payload:", payload);

    // Simulated API Request lag
    setTimeout(() => {
      setLoading(false);
      alert("Job posted successfully and is now active!");
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* Header Block matching image_6a82a0.png style */}
        <div className="flex flex-col gap-1 border-b border-zinc-800 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Create a New Job Post
          </h1>
          <p className="text-xs text-zinc-400">
            Fill out the details below to publish your vacancy to HireLoop.
          </p>
        </div>

        {/* Form Element */}
        {/* Section: Company Status Check Banner */}
        <Card className="bg-[#121212] border border-zinc-800 p-5 flex flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-800/80 rounded-lg text-zinc-400">
              <FiBriefcase size={20} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">
                Posting organization
              </p>
              <h3 className="text-sm font-semibold text-zinc-200">
                {companydata.name}
              </h3>
            </div>
          </div>
          <div>
            {companydata.isApproved ? (
              <span className="px-2.5 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Approved to Post
              </span>
            ) : (
              <span className="px-2.5 py-1 text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
                Pending Approval
              </span>
            )}
          </div>
        </Card>
        {companydata.status !== "approved" && (
          <div>Please wait to get approval</div>
        )}
        {companydata.status === "approved" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Section: Job Info Fields */}
            <Card className="bg-[#121212] border border-zinc-800 p-5 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <FiBriefcase size={16} className="text-zinc-400" />
                <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
                  Job Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-medium">
                    Job Title
                  </label>

                  <Input
                    name="title"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-medium">
                    Application Deadline
                  </label>

                  <Input
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-xs font-medium">
                  Job Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleSelectChange("category", e.target.value)
                  }
                  className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-3 py-3 text-white outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-xs font-medium">
                  Job Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleSelectChange("type", e.target.value)}
                  className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-3 py-3 text-white outline-none"
                  required
                >
                  <option value="">Select Job Type</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Constraints Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-medium">
                    Min Salary
                  </label>

                  <Input
                    name="minSalary"
                    type="number"
                    placeholder="0"
                    value={formData.minSalary}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-medium">
                    Max Salary
                  </label>

                  <Input
                    name="maxSalary"
                    type="number"
                    placeholder="0"
                    value={formData.maxSalary}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-medium">
                    Currency
                  </label>

                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      handleSelectChange("currency", e.target.value)
                    }
                    className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-3 py-3 text-white"
                  >
                    {currencies.map((curr) => (
                      <option key={curr} value={curr}>
                        {curr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Remote Switch Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-2 pt-2 border-t border-zinc-900">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300 text-xs font-medium">
                    Location
                  </label>

                  <Input
                    name="location"
                    placeholder="City, Country"
                    disabled={formData.isRemoteOnly}
                    value={formData.isRemoteOnly ? "" : formData.location}
                    onChange={handleInputChange}
                    required={!formData.isRemoteOnly}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-4 md:pt-0 shrink-0">
                  <span className="text-zinc-300 text-xs font-medium">
                    Remote Only?
                  </span>
                  <Switch
                    isSelected={formData.isRemoteOnly}
                    onValueChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        isRemoteOnly: checked,
                      }))
                    }
                    classNames={{
                      wrapper:
                        "bg-zinc-800 group-data-[selected=true]:bg-zinc-200",
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Section: Job Description textareas */}
            <Card className="bg-[#121212] border border-zinc-800 p-5 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <FiFileText size={16} className="text-zinc-400" />
                <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
                  Job Requirements & Details
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-xs font-medium">
                  Responsibilities
                </label>
                <textarea
                  name="responsibilities"
                  rows={4}
                  placeholder="Outline daily duties, project expectations, and management workflows..."
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl p-3 text-white outline-none resize-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-xs font-medium">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  rows={4}
                  placeholder="List required skills, experience levels, tools, and degree prerequisites..."
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl p-3 text-white outline-none resize-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-300 text-xs font-medium">
                  Benefits (Optional)
                </label>
                <textarea
                  name="benefits"
                  rows={3}
                  placeholder="Healthcare, equity choices, flexible learning allowances, PTO, etc."
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl p-3 text-white outline-none resize-none"
                />
              </div>
            </Card>

            {/* Footer Controls matching style image_6a82a0.png */}
            <div className="flex justify-end items-center gap-3 mt-4 border-t border-zinc-800 pt-5">
              <Button
                type="button"
                variant="bordered"
                className="border-zinc-800 text-zinc-300 font-medium px-6 rounded-xl hover:bg-zinc-900 h-11"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={loading}
                className="bg-white text-black font-semibold px-6 rounded-xl transition-all hover:bg-zinc-200 h-11"
              >
                Publish Job
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
