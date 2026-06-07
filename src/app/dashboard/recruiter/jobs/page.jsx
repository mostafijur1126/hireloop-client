import { getjobs } from "@/lib/api/jobs";
import React from "react";
import { Table, Button } from "@heroui/react";
// Using React Icons (Feather set) to perfectly match image_4f40a1.png
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { getLogedInRecruiterCompany } from "@/lib/api/companie";

const AlljobsPage = async () => {
  const company = await getLogedInRecruiterCompany();

  let jobs = [];
  try {
    jobs = await getjobs(company._id);
    // console.log(jobs);
  } catch (error) {
    console.error("Error loading jobs:", error);
  }

  return (
    <div className="w-full min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col gap-6">
        {/* Header Block */}
        <div className="flex flex-col gap-1 border-b border-zinc-800 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            All Posted Jobs
          </h1>
          <p className="text-xs text-zinc-400">
            View and manage all active listings published by your organization.
          </p>
        </div>

        {/* HeroUI Custom Compound Table */}
        <Table className="bg-[#121212] border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Job Postings Overview"
              className="min-w-[900px]"
            >
              <Table.Header className="bg-zinc-900/50 border-b border-zinc-800">
                <Table.Column
                  isRowHeader
                  className="text-zinc-400 font-semibold text-xs py-3.5"
                >
                  Job Title
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold text-xs py-3.5">
                  Category
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold text-xs py-3.5">
                  Type
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold text-xs py-3.5">
                  Salary Range
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold text-xs py-3.5">
                  Location
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold text-xs py-3.5">
                  Deadline
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold text-xs py-3.5">
                  Status
                </Table.Column>
                {/* Actions Header matching image_4f40a1.png */}
                <Table.Column className="text-zinc-400 font-semibold text-xs py-3.5 text-center w-[140px]">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {jobs && jobs?.length > 0 ? (
                  jobs.map((job) => (
                    <Table.Row
                      key={job._id}
                      className="border-b border-zinc-900/60 hover:bg-zinc-900/40 transition-colors"
                    >
                      {/* Title */}
                      <Table.Cell className="py-4 text-sm font-medium text-zinc-100">
                        {job.title}
                      </Table.Cell>

                      {/* Category */}
                      <Table.Cell className="py-4 text-xs text-zinc-300">
                        {job.category}
                      </Table.Cell>

                      {/* Type */}
                      <Table.Cell className="py-4 text-xs text-zinc-300">
                        <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700/60 rounded text-zinc-200">
                          {job.type}
                        </span>
                      </Table.Cell>

                      {/* Salary */}
                      <Table.Cell className="py-4 text-xs text-zinc-300 font-mono">
                        {job.minSalary} - {job.maxSalary} {job.currency}
                      </Table.Cell>

                      {/* Location */}
                      <Table.Cell className="py-4 text-xs text-zinc-400">
                        {job.isRemoteOnly ? "Remote Only" : job.location}
                      </Table.Cell>

                      {/* Deadline */}
                      <Table.Cell className="py-4 text-xs text-zinc-400">
                        {job.deadline}
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="py-4 text-xs">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            job.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-zinc-800 text-zinc-400 border-zinc-700"
                          }`}
                        >
                          {job.status}
                        </span>
                      </Table.Cell>

                      {/* Action Icons Panel matching image_4f40a1.png */}
                      <Table.Cell className="py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* View Button */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-zinc-400 hover:text-white min-w-8 w-8 h-8 rounded-lg"
                            aria-label="View Job"
                          >
                            <FiEye size={16} />
                          </Button>

                          {/* Edit Button */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-zinc-400 hover:text-white min-w-8 w-8 h-8 rounded-lg"
                            aria-label="Edit Job"
                          >
                            <FiEdit2 size={15} />
                          </Button>

                          {/* Delete Button - Using dark crimson/red styling */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-rose-500/80 hover:text-rose-400 hover:bg-rose-950/20 min-w-8 w-8 h-8 rounded-lg"
                            aria-label="Delete Job"
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  /* Empty State Row */
                  <Table.Row>
                    <Table.Cell
                      colSpan={8}
                      className="text-center py-10 text-zinc-500 text-xs"
                    >
                      No jobs posted yet. Create your first job to see it listed
                      here.
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default AlljobsPage;
