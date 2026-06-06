"use server";

import { serverMutation } from "../core/server";

export const createjob = async (newjob) => {
  return serverMutation("/api/jobs", newjob);
};

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createjob = async (newjob) => {
//   const res = await fetch(`${baseUrl}/api/jobs`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newjob),
//   });
//   return res.json();
// };
