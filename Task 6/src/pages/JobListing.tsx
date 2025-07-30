import { useState } from "react";
import JobCard from "../components/JobCard";
import JobDetails from "../components/JobDetails";
import data from "../assets/data.json"

interface IdealCandidate {
  age: string;
  gender: string;
  traits: string[];
}

interface About {
  posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  end_date: string;
  categories: string[];
  required_skills: string[];
}

export interface Job {
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: IdealCandidate;
  when_where: string;
  about: About;
  company: string;
}

const JobListingPage = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sortBy, setSortBy] = useState<"relevant" | "newest" | "deadlineSoon">(
    "relevant"
  );
  const jobs: Job[] = [...data.job_postings].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.about.posted_on).getTime() -
        new Date(a.about.posted_on).getTime()
      );
    } else if (sortBy === "deadlineSoon") {
      return (
        new Date(a.about.deadline).getTime() -
        new Date(b.about.deadline).getTime()
      );
    }
    return 0;
  });



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {selectedJob ? (
          <div>
            <button
              onClick={() => setSelectedJob(null)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Jobs
            </button>
            <JobDetails job={selectedJob} />
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Opportunities
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Showing {jobs.length} results</p>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Sort by:</span>
                  <select
                    title="Sort by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "relevant" | "newest" | "deadlineSoon")}
                    className="border-none outline-none rounded px-2 py-1"
                  >
                    <option value="relevant">Most relevant</option>
                    <option value="newest">Newest first</option>
                    <option value="deadlineSoon">Deadline soon</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              {jobs.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                  onClick={() => setSelectedJob(job)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingPage;
