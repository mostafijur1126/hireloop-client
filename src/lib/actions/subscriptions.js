"use server";

import { serverMutation } from "../core/server";

export const CreateSubscriptons = async (subInfo) => {
  return serverMutation("/api/subscriptions", subInfo);
};
