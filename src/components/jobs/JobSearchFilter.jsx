"use client";

import React, { useMemo, useState } from "react";
import { Select, Label, ListBox, Input, Button, Chip } from "@heroui/react";
import {
  Magnifier,
  SquareXmark,
  BarsDescendingAlignCenter,
} from "@gravity-ui/icons";

import JobCard from "./JobCard";

export default function JobSearchFilter({ jobs = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const uniqueTypes = useMemo(
    () => [...new Set(jobs.map((job) => job.type).filter(Boolean))],
    [jobs],
  );

  const uniqueCategories = useMemo(
    () => [...new Set(jobs.map((job) => job.category).filter(Boolean))],
    [jobs],
  );

  const uniqueLocations = useMemo(
    () => [...new Set(jobs.map((job) => job.location).filter(Boolean))],
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        !searchTerm ||
        job.title?.toLowerCase().includes(searchLower) ||
        job.companyName?.toLowerCase().includes(searchLower) ||
        job.responsibilities?.toLowerCase().includes(searchLower);

      const matchesType = !selectedType || job.type === selectedType;

      const matchesCategory =
        !selectedCategory || job.category === selectedCategory;

      const matchesLocation =
        !selectedLocation || job.location === selectedLocation;

      const matchesRemote = remoteOnly ? job.isRemoteOnly === true : true;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesLocation &&
        matchesRemote
      );
    });
  }, [
    jobs,
    searchTerm,
    selectedType,
    selectedCategory,
    selectedLocation,
    remoteOnly,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedCategory("");
    setSelectedLocation("");
    setRemoteOnly(false);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedType ||
    selectedCategory ||
    selectedLocation ||
    remoteOnly;

  return (
    <div className="space-y-6 container mx-auto">
      {/* Filters */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs..."
            startContent={<Magnifier width={16} height={16} />}
            endContent={
              searchTerm ? (
                <button onClick={() => setSearchTerm("")}>
                  <SquareXmark width={14} height={14} />
                </button>
              ) : null
            }
          />

          <Select
            selectedKeys={selectedType ? new Set([selectedType]) : new Set()}
            onSelectionChange={(keys) => {
              const value = [...keys][0] || "";
              setSelectedType(value);
            }}
          >
            <Label>Job Type</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {uniqueTypes.map((type) => (
                  <ListBox.Item key={type}>
                    <Label>{type}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            selectedKeys={
              selectedCategory ? new Set([selectedCategory]) : new Set()
            }
            onSelectionChange={(keys) => {
              const value = [...keys][0] || "";
              setSelectedCategory(value);
            }}
          >
            <Label>Category</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {uniqueCategories.map((category) => (
                  <ListBox.Item key={category}>
                    <Label>{category}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            selectedKeys={
              selectedLocation ? new Set([selectedLocation]) : new Set()
            }
            onSelectionChange={(keys) => {
              const value = [...keys][0] || "";
              setSelectedLocation(value);
            }}
          >
            <Label>Location</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {uniqueLocations.map((location) => (
                  <ListBox.Item key={location}>
                    <Label>{location}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              remoteOnly
                ? "bg-blue-600 text-white"
                : "bg-[#202024] text-gray-400"
            }`}
          >
            <BarsDescendingAlignCenter width={14} height={14} />
            Remote Only
          </button>

          {hasActiveFilters && (
            <Button color="default" variant="flat" onPress={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Chip onClose={() => setSearchTerm("")}>Search: {searchTerm}</Chip>
          )}

          {selectedType && (
            <Chip onClose={() => setSelectedType("")}>
              Type: {selectedType}
            </Chip>
          )}

          {selectedCategory && (
            <Chip onClose={() => setSelectedCategory("")}>
              Category: {selectedCategory}
            </Chip>
          )}

          {selectedLocation && (
            <Chip onClose={() => setSelectedLocation("")}>
              Location: {selectedLocation}
            </Chip>
          )}

          {remoteOnly && (
            <Chip onClose={() => setRemoteOnly(false)}>Remote Only</Chip>
          )}
        </div>
      )}

      {/* Results */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-[#18181b] rounded-xl border border-[#27272a]">
          <p className="text-gray-400">No jobs match your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
