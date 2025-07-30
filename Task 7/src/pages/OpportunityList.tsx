import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOpportunities } from "../api/client";
import type { Opportunity } from "../types/opportunity";
import { SkeletonCard } from "../components/SkeletonLoader";

const OpportunityList: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const data = await fetchOpportunities();
        console.log(data)
        setOpportunities(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch opportunities"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Volunteer Opportunities
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(10)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/opportunities/${opportunity.id}`)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={
                      opportunity.logoUrl || "https://via.placeholder.com/50"
                    }
                    alt={opportunity.orgName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {opportunity.orgName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(opportunity.datePosted)}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {opportunity.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {opportunity.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.categories?.slice(0, 2).map((category, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  {opportunity.location?.map((loc, idx) => (
                    <span
                      key={`loc-${idx}`}
                      className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                    >
                      {loc}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{opportunity.applicantsCount} applicants</span>
                  <span>{opportunity.viewsCount} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpportunityList;
