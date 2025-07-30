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
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Dashboard!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              You have successfully signed in to your account. Your authentication is working perfectly!
            </p>
            <div className="bg-white rounded-lg shadow-sm border p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Status</h3>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <Link href="/signin">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
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
            Experience seamless user authentication with our modern, secure platform. 
            Sign up today and join thousands of users who trust our authentication system.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link href="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3">
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
      </main>
    </div>
  );
}
