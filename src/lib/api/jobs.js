const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getjobs = async (companyId) => {
  const status = "active";
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status:${status}`,
  );
  return res.json();
};
