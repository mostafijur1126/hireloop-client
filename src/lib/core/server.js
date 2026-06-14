import { getToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getToken();
  const header = {
    authorization: `Bearer : ${token};`,
  };
  return token ? header : {};
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  // handle 401,403
  return res.json();
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });
  // handle 401,403
  return res.json();
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  // handel 401, 404, 403
  return res.json();
};
