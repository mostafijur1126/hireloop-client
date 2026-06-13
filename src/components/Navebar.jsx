"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Bars, Xmark, Code } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;
  // console.log(isPending);

  const handelSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  };

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/companies" },
    { label: "Pricing", href: "/plans" },
  ];

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };
  if (user?.email) {
    navLinks.push({
      label: "Dashboard",
      href: dashboardLinks[user?.role || "seeker"],
    });
  }

  return (
    <header className="w-full px-4 py-4">
      <nav className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-[#111214] px-4 py-4 shadow-2xl backdrop-blur-md md:px-6">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg">
              <Code className="h-5 w-5 text-white" />
            </div>

            <div className="leading-tight">
              <h1 className="text-lg font-bold tracking-tight text-white">
                DevHire
              </h1>

              <p className="text-xs text-gray-400">Programming Jobs</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">
            {/* Menu */}
            <div className="flex items-center gap-10 rounded-2xl border border-white/5 bg-white/[0.03] px-8 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Vertical Line */}
              <div className="h-6 w-px bg-white/10" />

              {isPending ? (
                <>loading...</>
              ) : (
                <>
                  {user ? (
                    <>
                      Hi, {user.name}!
                      <Button onClick={handelSignOut} variant="outline">
                        SignOut
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                      >
                        Sign In
                      </Link>

                      <Link href="/auth/signup">
                        <Button
                          radius="xl"
                          className="bg-white px-6 font-semibold text-black transition hover:bg-gray-200"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            {isOpen ? (
              <Xmark className="h-5 w-5" />
            ) : (
              <Bars className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            isOpen ? "max-h-[500px] opacity-100 pt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="h-px w-full bg-white/10" />

            <Link
              href="/auth/signin"
              className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button
                radius="xl"
                className="mt-2 w-full bg-white font-semibold text-black transition hover:bg-gray-200"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
