import { serverFetch } from "../core/server";
import { getuserSession } from "../core/session";

export const getCompany = async () => {
  return serverFetch(`/api/companies`);
};

export const getRecruiterCompany = async (recruiterId) => {
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLogedInRecruiterCompany = async () => {
  const user = await getuserSession();
  return getRecruiterCompany(user?.id);
};
