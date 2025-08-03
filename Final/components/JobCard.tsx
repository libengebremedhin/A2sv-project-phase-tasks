"use client";

import { useState } from "react";
import { JobPosting } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar, Building } from "lucide-react";

interface JobCardProps {
  job: JobPosting;
  isBookmarked: boolean;
  onBookmarkToggle: (jobId: string) => Promise<void>;
  isAuthenticated: boolean;
}

export function JobCard({ job, isBookmarked, onBookmarkToggle, isAuthenticated }: JobCardProps) {
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    setIsBookmarking(true);
    try {
      await onBookmarkToggle(job.id);
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <Card 
      className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      data-testid="job-card"
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1" data-testid="job-title">
              {job.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Building className="w-4 h-4 mr-1" />
              <span data-testid="job-company">{job.company}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmarkClick}
            disabled={!isAuthenticated || isBookmarking}
            className={`p-2 h-auto ${
              isBookmarked 
                ? "text-red-500 hover:text-red-600" 
                : "text-gray-400 hover:text-red-500"
            } ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`}
            data-testid="bookmark-button"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Heart 
              className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
              data-testid="bookmark-icon"
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3" data-testid="job-description">
          {job.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span data-testid="job-location">{job.about.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span data-testid="job-deadline">Deadline: {job.about.deadline}</span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-700">Categories:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {job.about.categories.map((category, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs"
                    data-testid="job-category"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Required Skills:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {job.about.required_skills.slice(0, 3).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs"
                    data-testid="job-skill"
                  >
                    {skill}
                  </Badge>
                ))}
                {job.about.required_skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.about.required_skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="w-full flex justify-between items-center text-sm text-gray-500">
          <span data-testid="job-posted-date">Posted: {job.about.posted_on}</span>
          {!isAuthenticated && (
            <span className="text-xs text-gray-400">Sign in to bookmark</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
