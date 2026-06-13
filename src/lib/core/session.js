import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getuserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session?.user || null;
};

export const requireRole = async (role) => {
  const user = await getuserSession();
  if (user.role !== role) {
    return redirect("/unauthorized");
  }
};
