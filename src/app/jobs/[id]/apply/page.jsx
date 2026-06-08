import { getjobsById } from "@/lib/api/jobs";
import { getuserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";

const ApplyJobsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getuserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    return (
      <div>
        <p>
          Only job seeker can apply for this position. please sing wite a job
          seeker rele
        </p>
      </div>
    );
  }

  const job = await getjobsById(id);

  return (
    <div>
      <JobApply job={job}></JobApply>
    </div>
  );
};

export default ApplyJobsPage;
