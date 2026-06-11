import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle, FiMail, FiHome, FiShoppingBag } from "react-icons/fi";
import { CreateSubscriptons } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const {
    status,
    customer_details,
    metadata,
    line_items,
    amount_total,
    currency,
  } = session;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status !== "complete") {
    return redirect("/");
  }

  // Format amount (assuming amount in cents)
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency?.toUpperCase() || "USD",
  }).format((amount_total || 0) / 100);

  const subsInfo = {
    email: customerEmail,
    planId: metadata.planId,
  };
  // update the user table about the new plan
  const result = await CreateSubscriptons(subsInfo);
  console.log(result);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Animated Checkmark */}
          <div className="flex justify-center pt-8 pb-4">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
              <FiCheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center px-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-400">
              Thank you for your purchase. Your transaction has been completed.
            </p>
          </div>

          {/* Order Summary */}
          <div className="mt-8 mx-6 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiShoppingBag className="w-5 h-5 text-blue-400" />
              Order Summary
            </h2>
            <div className="space-y-3">
              {line_items?.data?.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-300">
                  <span>
                    {item.quantity} × {item.description}
                  </span>
                  <span className="font-medium text-white">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currency?.toUpperCase() || "USD",
                    }).format(item.amount_total / 100)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>{formattedAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="mt-6 mx-6 p-4 bg-blue-900/20 rounded-xl border border-blue-800/50 flex items-start gap-3">
            <FiMail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="font-medium text-blue-300">
                Confirmation Email Sent
              </p>
              <p>
                A receipt has been sent to{" "}
                <span className="text-blue-400 font-mono">{customerEmail}</span>
                . If you have any questions, please contact{" "}
                <a
                  href="mailto:orders@example.com"
                  className="text-blue-400 hover:underline"
                >
                  orders@example.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 pt-4">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              <FiHome className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Fine Print */}
        <p className="text-center text-gray-500 text-xs mt-6">
          This is a confirmation of your payment. No further action is required.
        </p>
      </div>
    </div>
  );
}
