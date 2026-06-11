import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_Pro: "price_1TgdYQCRS2C5nrZAnVQ6bNbv",
  seeker_Premium: "price_1Th2QXCRS2C5nrZASFwJYmHc",
  recruiter_Growth: "price_1Th5TCCRS2C5nrZADvRXj3bP",
  recruiter_Enterprise: "price_1Th5UACRS2C5nrZAZPzQfN6t",
};
