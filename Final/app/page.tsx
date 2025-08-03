"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useNextAuth } from "@/contexts/NextAuthContext";

export default function HomePage() {
  const { isAuthenticated, logout } = useNextAuth();

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">AuthApp</h1>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/jobs">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/bookmarks">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    My Bookmarks
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Dashboard!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              You have successfully signed in to your account. Your
              authentication is working perfectly!
            </p>
            <div className="bg-white rounded-lg shadow-sm border p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Authentication Status
              </h3>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Authenticated</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AuthApp</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/jobs">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Browse Jobs
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-gray-900 sm:text-7xl">
            Secure
            <span className="relative whitespace-nowrap text-indigo-600">
              <span className="relative"> Authentication</span>
            </span>{" "}
            Made Simple
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700">
            Experience seamless user authentication with our modern, secure
            platform. Sign up today and join thousands of users who trust our
            authentication system.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Authentication Features
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for secure authentication
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                        />
                      </svg>
                    </div>
                    Secure Registration
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Advanced security measures protect your account during
                    registration with email verification.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </div>
                    Email Verification
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Verify your email address with our secure OTP system for
                    enhanced account security.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                    Secure Login
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Fast and secure login process with industry-standard
                    encryption and token management.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                      </svg>
                    </div>
                    Mobile Responsive
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Seamless experience across all devices with our fully
                    responsive authentication interface.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
