"use client";

import { useState, useEffect } from "react";
import { useNextAuth } from "@/contexts/NextAuthContext";
import { JobPosting } from "@/types/job";
import { JobCard } from "@/components/JobCard";
import { useToast } from "@/hooks/use-toast";
import { BookmarkService } from "@/lib/bookmarkService";
import { useRouter } from "next/navigation";

// Mock job data (in a real app, this would come from an API)
const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Social media manager",
    description: "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns.",
    responsibilities: [],
    ideal_candidate: { age: "18-24", gender: "Female", traits: [] },
    when_where: "",
    about: {
      posted_on: "Jul 1, 2023",
      deadline: "Jul 31, 2023",
      location: "Addis Ababa",
      start_date: "Aug 02, 2023",
      end_date: "Sep 02, 2023",
      categories: ["Marketing", "Design"],
      required_skills: ["Social Media Marketing", "English", "Copywriting"]
    },
    company: "ABC Media",
    image: "/job1.png"
  },
  {
    id: "2",
    title: "Web developer",
    description: "As a Web Developer, you will be responsible for designing, coding, and modifying websites, from layout to function according to a client's specifications.",
    responsibilities: [],
    ideal_candidate: { age: "Any", gender: "Any", traits: [] },
    when_where: "",
    about: {
      posted_on: "Jan 15, 2023",
      deadline: "Feb 5, 2023",
      location: "Addis Ababa, Ethiopia",
      start_date: "Feb 15, 2023",
      end_date: "Aug 15, 2023",
      categories: ["IT", "Development"],
      required_skills: ["HTML", "CSS", "JavaScript", "PHP"]
    },
    company: "Tech Innovators",
    image: "/job1.png"
  }
];

export default function BookmarksPage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<JobPosting[]>([]);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useNextAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    loadBookmarks();
  }, [isAuthenticated, router]);

  const loadBookmarks = async () => {
    setIsLoading(true);
    try {
      const result = await BookmarkService.getBookmarks();
      if (result.success && result.bookmarks) {
        const bookmarkedJobIds = new Set(result.bookmarks);
        setBookmarkedJobIds(bookmarkedJobIds);
        
        // Filter mock jobs to show only bookmarked ones
        const bookmarkedJobsData = mockJobs.filter(job => bookmarkedJobIds.has(job.id));
        setBookmarkedJobs(bookmarkedJobsData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load bookmarks",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmarkToggle = async (jobId: string) => {
    try {
      const result = await BookmarkService.removeBookmark(jobId);
      if (result.success) {
        // Remove from bookmarked jobs
        setBookmarkedJobs(prev => prev.filter(job => job.id !== jobId));
        setBookmarkedJobIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
        
        toast({
          title: "Bookmark Removed",
          description: "Job removed from your bookmarks",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to remove bookmark",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to signin
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
            <p className="text-sm text-gray-600">
              {bookmarkedJobs.length} bookmarked job{bookmarkedJobs.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </header>

      {/* Bookmarked Jobs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookmarkedJobs.length === 0 ? (
          <div className="text-center py-12" data-testid="no-bookmarks">
            <div className="text-gray-500 text-lg mb-4">
              You haven't bookmarked any jobs yet
            </div>
            <p className="text-gray-400 mb-6">
              Start browsing jobs and bookmark the ones you're interested in
            </p>
            <button
              onClick={() => router.push("/jobs")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarkedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={true}
                onBookmarkToggle={handleBookmarkToggle}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
