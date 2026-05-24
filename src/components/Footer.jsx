"use client";

import Link from "next/link";
import {
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
  Code,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black px-4 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-4">
        {/* Left Side */}
        <div className="flex flex-col justify-between">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg">
                <Code className="h-5 w-5 text-white" />
              </div>

              <div className="leading-tight">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Hireing
                </h1>

                <p className="-mt-1 text-lg font-bold tracking-tight text-white">
                  Loop
                </p>
              </div>
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-7 text-gray-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Social Icons */}
          <div className="mt-10 flex items-center gap-3">
            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-violet-600"
            >
              <LogoFacebook className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
            >
              <LogoGithub className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-violet-600"
            >
              <LogoLinkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-6 text-sm font-semibold text-violet-500">
            Product
          </h3>

          <div className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Job discovery
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Worker AI
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Companies
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Salary data
            </Link>
          </div>
        </div>

        {/* Navigations */}
        <div>
          <h3 className="mb-6 text-sm font-semibold text-violet-500">
            Navigations
          </h3>

          <div className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Help center
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Career library
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-6 text-sm font-semibold text-violet-500">
            Resources
          </h3>

          <div className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Brand Guideline
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Newsroom
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-sm text-gray-600 md:flex-row">
        <p>Copyright 2024 — HireLoop</p>

        <div className="flex items-center gap-4">
          <Link href="#" className="transition hover:text-white">
            Terms & Policy
          </Link>

          <span>-</span>

          <Link href="#" className="transition hover:text-white">
            Privacy Guideline
          </Link>
        </div>
      </div>
    </footer>
  );
}
