"use client";

import { useState, useEffect } from "react";
import { useNextAuth } from "@/contexts/NextAuthContext";
import { JobPosting } from "@/types/job";
import { JobCard } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BookmarkService } from "@/lib/bookmarkService";

// Mock job data from the provided JSON
const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Social media manager",
    description: "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers. Your primary goal will be to enhance brand visibility, foster positive relationships with the audience, and drive engagement and conversions.",
    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content development and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms, and suggest content ideas to the team",
      "Engage with online communities"
    ],
    ideal_candidate: {
      age: "18-24",
      gender: "Female",
      traits: [
        "Passionate & Reliable: Genuine interest in our mission and a strong desire to make a positive impact, responsible, and committed to fulfilling volunteer commitments.",
        "Adaptable, Team Player & Strong Communication Skills: Able to work effectively in diverse teams; and contributes positively. Flexible and open to embracing new challenges and shifting priorities; Clear verbal and written communication, active listening, and constructive feedback.",
        "Respectful: Embraces diversity, inclusive, and treats others with respect. Abides with all our rules and regulations."
      ]
    },
    when_where: "The onboarding event for this event will take place on Jan 18th, 2023 in AAU Auditorium.",
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
    description: "As a Web Developer, you will be responsible for designing, coding, and modifying websites, from layout to function according to a client's specifications. You will create visually appealing sites that feature user-friendly design and clear navigation.",
    responsibilities: [
      "Write well designed, testable, efficient code by using best software development practices",
      "Create website layout/user interface by using standard HTML/CSS practices",
      "Integrate data from various back-end services and databases",
      "Gather and refine specifications and requirements based on technical needs",
      "Create and maintain software documentation"
    ],
    ideal_candidate: {
      age: "Any",
      gender: "Any",
      traits: [
        "Strong organizational skills to juggle multiple tasks within the constraints of timelines and budgets",
        "Ability to work and thrive in a fast-paced environment, learn rapidly, and master diverse web technologies and techniques",
        "Team player with a positive attitude and good interpersonal skills"
      ]
    },
    when_where: "The onboarding event for this event will take place on Feb 10th, 2023 in BBIT Building, Room 202.",
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
  },
  {
    id: "3",
    title: "Graphic designer",
    description: "As a Graphic Designer, you will create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers. You will develop the overall layout and production design for various applications such as advertisements, brochures, magazines, and corporate reports.",
    responsibilities: [
      "Develop graphics for product illustrations, logos, and websites",
      "Select colors, images, text style, and layout",
      "Present the design to clients or the art director",
      "Incorporate changes recommended by the clients into the final design",
      "Review designs for errors before printing or publishing them"
    ],
    ideal_candidate: {
      age: "Any",
      gender: "Any",
      traits: [
        "A keen eye for aesthetics and details",
        "Excellent communication skills",
        "Ability to work methodically and meet deadlines",
        "Passionate about creating stunning visuals and innovative designs"
      ]
    },
    when_where: "The onboarding event for this event will take place on Mar 5th, 2023 in Design Studio, 3rd Floor.",
    about: {
      posted_on: "Feb 1, 2023",
      deadline: "Feb 28, 2023",
      location: "Cape Town, South Africa",
      start_date: "Mar 10, 2023",
      end_date: "Sep 10, 2023",
      categories: ["Design", "Art"],
      required_skills: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Creativity",
        "Attention to detail"
      ]
    },
    company: "Creative Designs Co.",
    image: "/job1.png"
  },
  {
    id: "4",
    title: "Data analyst",
    description: "As a Data Analyst, you will be responsible for analyzing data sets to identify trends, patterns, and insights that can help inform business decisions. You will work closely with different departments to gather and interpret data, create reports, and provide recommendations based on your findings.",
    responsibilities: [
      "Interpret data, analyze results using statistical techniques and provide ongoing reports",
      "Develop and implement databases, data collection systems, data analytics, and other strategies",
      "Acquire data from primary or secondary data sources and maintain databases/data systems",
      "Identify, analyze, and interpret trends or patterns in complex data sets",
      "Filter and clean data by reviewing computer reports, printouts, and performance indicators"
    ],
    ideal_candidate: {
      age: "Any",
      gender: "Any",
      traits: [
        "Strong analytical skills with the ability to collect, organize, analyze, and disseminate significant amounts of information",
        "Technical expertise regarding data models, database design development, data mining, and segmentation techniques",
        "Excellent written and verbal communication skills",
        "Ability to work independently and as part of a team"
      ]
    },
    when_where: "The onboarding event for this event will take place on Apr 12th, 2023 in Conference Room B.",
    about: {
      posted_on: "Mar 10, 2023",
      deadline: "Apr 1, 2023",
      location: "Lagos, Nigeria",
      start_date: "Apr 15, 2023",
      end_date: "Oct 15, 2023",
      categories: ["Data Science", "Analytics"],
      required_skills: ["SQL", "Python", "Excel", "Statistical Analysis"]
    },
    company: "Data Insights Inc.",
    image: "/job1.png"
  },
  {
    id: "5",
    title: "Customer support specialist",
    description: "As a Customer Support Specialist, you will provide product/services information and resolve any emerging problems that our customers might face with accuracy and efficiency. You will be patient, empathetic, and passionately communicative.",
    responsibilities: [
      "Manage large amounts of incoming calls and emails",
      "Identify and assess customers' needs to achieve satisfaction",
      "Build sustainable relationships and trust with customer accounts through open and interactive communication",
      "Provide accurate, valid, and complete information by using the right methods/tools",
      "Handle customer complaints, provide appropriate solutions and alternatives within the time limits; follow up to ensure resolution"
    ],
    ideal_candidate: {
      age: "Any",
      gender: "Any",
      traits: [
        "Strong phone contact handling skills and active listening",
        "Customer orientation and ability to adapt/respond to different types of characters",
        "Excellent communication and presentation skills",
        "Ability to multi-task, prioritize, and manage time effectively"
      ]
    },
    when_where: "The onboarding event for this event will take place on May 20th, 2023 in Customer Support Center, Ground Floor.",
    about: {
      posted_on: "Apr 15, 2023",
      deadline: "May 10, 2023",
      location: "Accra, Ghana",
      start_date: "May 25, 2023",
      end_date: "Nov 25, 2023",
      categories: ["Customer Service", "Support"],
      required_skills: [
        "Communication Skills",
        "Problem Solving",
        "Patience",
        "Attention to Detail"
      ]
    },
    company: "Customer Care Ltd.",
    image: "/job1.png"
  }
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const { isAuthenticated } = useNextAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadBookmarks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Filter jobs based on search term
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const loadBookmarks = async () => {
    try {
      const result = await BookmarkService.getBookmarks();
      if (result.success && result.bookmarks) {
        setBookmarkedJobs(new Set(result.bookmarks));
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    }
  };

  const handleBookmarkToggle = async (jobId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to bookmark jobs",
        variant: "destructive",
      });
      return;
    }

    const isCurrentlyBookmarked = bookmarkedJobs.has(jobId);
    
    try {
      let result;
      if (isCurrentlyBookmarked) {
        result = await BookmarkService.removeBookmark(jobId);
      } else {
        result = await BookmarkService.createBookmark(jobId);
      }

      if (result.success) {
        const newBookmarkedJobs = new Set(bookmarkedJobs);
        if (isCurrentlyBookmarked) {
          newBookmarkedJobs.delete(jobId);
          toast({
            title: "Bookmark Removed",
            description: "Job removed from your bookmarks",
          });
        } else {
          newBookmarkedJobs.add(jobId);
          toast({
            title: "Job Bookmarked",
            description: "Job added to your bookmarks",
          });
        }
        setBookmarkedJobs(newBookmarkedJobs);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update bookmark",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
            <div className="flex items-center gap-4">
              <div className="w-80">
                <Input
                  type="text"
                  placeholder="Search jobs by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Job Listings */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12" data-testid="no-jobs-found">
            <div className="text-gray-500 text-lg">
              {searchTerm ? `No jobs found matching "${searchTerm}"` : "No jobs available"}
            </div>
            {searchTerm && (
              <Button 
                onClick={() => setSearchTerm("")}
                variant="outline"
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={bookmarkedJobs.has(job.id)}
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
