"use client";

import React, { useState, useRef } from "react";
import { Input, Button, Card } from "@heroui/react";
import {
  Factory,
  Globe,
  MapPin,
  Persons,
  Text,
  CloudArrowUpIn,
  Pencil,
  CircleCheck,
  CircleExclamation,
  CircleXmark,
} from "@gravity-ui/icons";

export default function CompanyProfilePage() {
  const [hasCompany, setHasCompany] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [company, setCompany] = useState({
    name: "",
    industry: "Technology",
    websiteUrl: "",
    location: "",
    employeeCount: "1-10 employees",
    logoUrl: "",
    description: "",
    status: "pending",
  });

  const fileInputRef = useRef(null);

  const industries = [
    "Technology",
    "Design",
    "Marketing",
    "Sales",
    "Finance",
    "Healthcare",
  ];

  const employeeRanges = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploadingLogo(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY";

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.success) {
        setCompany((prev) => ({
          ...prev,
          logoUrl: data.data.url,
        }));
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setHasCompany(true);
      setIsEditing(false);

      alert("Company profile saved successfully!");
    }, 1200);
  };

  const renderStatusBadge = () => {
    switch (company.status) {
      case "approved":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
            <CircleCheck width={12} height={12} />
            Approved
          </span>
        );

      case "rejected":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
            <CircleXmark width={12} height={12} />
            Rejected
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
            <CircleExclamation width={12} height={12} />
            Pending Approval
          </span>
        );
    }
  };

  if (!hasCompany && !isEditing) {
    return (
      <div className="w-full min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <Card className="w-full max-w-lg bg-[#121212] border border-zinc-800 p-8 flex flex-col items-center text-center gap-5">
          <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400">
            <Factory width={40} height={40} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-100">
              No Company Registered
            </h2>

            <p className="text-xs text-zinc-400 mt-2">
              Register your company to start posting jobs.
            </p>
          </div>

          <Button
            className="bg-white text-black font-semibold px-6 rounded-xl w-full mt-2 h-11"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Register Company
          </Button>
        </Card>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="w-full min-h-screen bg-black text-white p-6 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <div className="border-b border-zinc-800 pb-5">
            <h1 className="text-2xl font-bold text-zinc-100">
              {company.name ? "Edit Company Profile" : "Register New Company"}
            </h1>

            <p className="text-xs text-zinc-400 mt-1">
              Fill all information carefully.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <Card className="bg-[#121212] border border-zinc-800 p-6 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-300 mb-2 block">
                    Company Name
                  </label>

                  <Input
                    name="name"
                    placeholder="Acme Corp"
                    value={company.name}
                    onChange={handleInputChange}
                    required
                    className={{
                      inputWrapper: "bg-[#1c1c1e] border border-zinc-800",
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 mb-2 block">
                    Industry
                  </label>

                  <select
                    name="industry"
                    value={company.industry}
                    onChange={handleInputChange}
                    className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-3 h-10 text-sm text-white outline-none"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-300 mb-2 block">
                    Website URL
                  </label>

                  <Input
                    name="websiteUrl"
                    placeholder="company.com"
                    value={company.websiteUrl}
                    onChange={handleInputChange}
                    // startContent={
                    //   <span className="text-zinc-500 text-xs">https://</span>
                    // }
                    required
                    className={{
                      inputWrapper: "bg-[#1c1c1e] border border-zinc-800",
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 mb-2 block">
                    Location
                  </label>

                  <Input
                    name="location"
                    placeholder="City, Country"
                    value={company.location}
                    onChange={handleInputChange}
                    required
                    // startContent={
                    //   <MapPin
                    //     width={14}
                    //     height={14}
                    //     className="text-zinc-500"
                    //   />
                    // }
                    className={{
                      inputWrapper: "bg-[#1c1c1e] border border-zinc-800",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-300 mb-2 block">
                    Employee Count
                  </label>

                  <select
                    name="employeeCount"
                    value={company.employeeCount}
                    onChange={handleInputChange}
                    className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl px-3 h-10 text-sm text-white outline-none"
                  >
                    {employeeRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 mb-2 block">
                    Company Logo
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-zinc-800 bg-[#1c1c1e] rounded-xl flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt="Logo"
                        className="h-14 w-14 object-contain rounded-lg"
                      />
                    ) : (
                      <CloudArrowUpIn
                        width={22}
                        height={22}
                        className="text-zinc-400"
                      />
                    )}

                    <div className="text-left">
                      <p className="text-xs text-zinc-200 font-semibold">
                        {uploadingLogo ? "Uploading..." : "Upload Logo"}
                      </p>

                      <p className="text-[10px] text-zinc-500">PNG / JPG</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-300 mb-2 block">
                  Description
                </label>

                <textarea
                  name="description"
                  value={company.description}
                  onChange={handleInputChange}
                  placeholder="Company description..."
                  rows={5}
                  required
                  className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl p-3 text-sm text-white outline-none resize-none"
                />
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="bordered"
                className="border-zinc-800 text-zinc-300"
                onClick={() => {
                  setIsEditing(false);

                  if (!company.name) {
                    setHasCompany(false);
                  }
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isLoading={loading}
                disabled={uploadingLogo}
                className="bg-white text-black font-semibold"
              >
                Save Company
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">
              Company Profile
            </h1>

            <p className="text-xs text-zinc-400 mt-1">
              Manage company details.
            </p>
          </div>

          <Button
            onClick={() => setIsEditing(true)}
            // startContent={<Pencil width={14} height={14} />}
            className="bg-zinc-900 text-zinc-200 border border-zinc-800"
          >
            Edit Profile
          </Button>
        </div>

        <Card className="bg-[#121212] border border-zinc-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Factory width={28} height={28} className="text-zinc-500" />
              )}
            </div>

            <div>
              <p className="text-xs text-zinc-500">{company.industry}</p>

              <h2 className="text-xl font-bold">{company.name}</h2>
            </div>
          </div>

          {renderStatusBadge()}
        </Card>

        <Card className="bg-[#121212] border border-zinc-800 p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <Globe width={16} height={16} />
              </div>

              <div>
                <p className="text-[11px] uppercase text-zinc-500">Website</p>

                <a
                  href={`https://${company.websiteUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-200 hover:underline break-all"
                >
                  https://{company.websiteUrl}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <MapPin width={16} height={16} />
              </div>

              <div>
                <p className="text-[11px] uppercase text-zinc-500">Location</p>

                <p className="text-sm text-zinc-200">{company.location}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <Persons width={16} height={16} />
              </div>

              <div>
                <p className="text-[11px] uppercase text-zinc-500">
                  Company Size
                </p>

                <p className="text-sm text-zinc-200">{company.employeeCount}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Text width={15} height={15} />

              <h3 className="text-xs uppercase text-zinc-500 font-bold">
                Description
              </h3>
            </div>

            <div className="bg-[#1c1c1e] border border-zinc-800 rounded-xl p-4">
              <p className="text-sm text-zinc-300 whitespace-pre-line">
                {company.description}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
