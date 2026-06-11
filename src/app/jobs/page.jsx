import JobSearchFilter from "@/components/jobs/JobSearchFilter";
import { getjobs } from "@/lib/api/jobs";

const BrowseJobsPage = async () => {
  const jobs = await getjobs();
  // console.log(jobs);
  return <JobSearchFilter jobs={jobs} />;
};

export default BrowseJobsPage;
