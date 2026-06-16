import JobSearchFilter from "@/components/jobs/JobSearchFilter";
import { getjobs } from "@/lib/api/jobs";

const BrowseJobsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const filterObj = {
    ...filters,
    isRemoteOnly: filters.isRemoteOnly === "true" ? true : false,
  };

  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();

  const jobs = await getjobs(queryString);
  // console.log(jobs);
  return <JobSearchFilter filters={filterObj} jobs={jobs || []} />;
};

export default BrowseJobsPage;
