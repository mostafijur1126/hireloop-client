import { protectedFetch, serverFetch } from "../core/server";
import { getuserSession } from "../core/session";

export const getCompany = async () => {
  return protectedFetch(`/api/companies`);
};

export const getRecruiterCompany = async (recruiterId) => {
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLogedInRecruiterCompany = async () => {
  const user = await getuserSession();
  return getRecruiterCompany(user?.id);
};
