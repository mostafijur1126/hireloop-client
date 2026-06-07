import React from "react";
import PostJobForm from "./PostJobForm";
import { getLogedInRecruiterCompany } from "@/lib/api/companie";

const PostJobsPage = async () => {
  const company = await getLogedInRecruiterCompany();

  return (
    <div>
      <PostJobForm companydata={company}></PostJobForm>
    </div>
  );
};

export default PostJobsPage;
