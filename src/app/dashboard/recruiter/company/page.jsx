import React from "react";
import CompanyProfilePage from "./CompanyProfilePage";
import { getuserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companie";

const companyPage = async () => {
  const user = await getuserSession();
  const company = await getRecruiterCompany(user?.id);
  //   console.log(user?.id);
  return (
    <div>
      <CompanyProfilePage
        recruiter={user}
        recruiterCompany={company}
      ></CompanyProfilePage>
    </div>
  );
};

export default companyPage;
