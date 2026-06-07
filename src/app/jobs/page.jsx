import JobCard from "@/components/jobs/JobCard";
import { getjobs } from "@/lib/api/jobs";
import React from "react";

// const jobData = {
//   _id: { $oid: "6a213f8d40f2d52b0326de57" },
//   title: "Web Developer",
//   category: "Technology",
//   type: "Remote",
//   minSalary: "25000",
//   maxSalary: "30000",
//   currency: "BDT",
//   location: "Dhaka",
//   isRemoteOnly: false,
//   deadline: "2026-07-31",
//   responsibilities: "Atque accusamus anim",
//   requirements: "Quo cum dolorum amet",
//   benefits: "Delectus laboris no",
//   companyId: "co_12345",
//   status: "active",
//   isPublic: true,
// };
const BrowseJobsPage = async () => {
  const jobs = await getjobs();
  return (
    <div>
      <h2> jobs: {jobs.length}</h2>
      <JobCard job={jobs[16]}></JobCard>
    </div>
  );
};

export default BrowseJobsPage;
