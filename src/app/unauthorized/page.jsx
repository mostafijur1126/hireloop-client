"use client";
import React from "react";
import Link from "next/link";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 text-center p-8">
          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-3">Access Denied</h1>

          {/* Message */}
          <p className="text-gray-400 mb-6">
            You do not have permission to view this page. Please contact your
            administrator if you believe this is a mistake.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              <FiHome className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg"
            >
              <FiArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        {/* Helpful Tip */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Need access?{" "}
            <Link href="/contact" className="text-blue-400 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
