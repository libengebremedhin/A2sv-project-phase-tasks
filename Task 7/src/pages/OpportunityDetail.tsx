    import React, { useEffect, useState } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { fetchOpportunityById } from "../api/client";
    import type { Opportunity } from "../types/opportunity";
    import { SkeletonDetail } from "../components/SkeletonLoader";

    const OpportunityDetail: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const navigate = useNavigate();

      useEffect(() => {
        const loadOpportunity = async () => {
          if (!id) return;

          try {
            const data = await fetchOpportunityById(id);
            setOpportunity(data);
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Failed to fetch opportunity"
            );
          } finally {
            setLoading(false);
          }
        };

        loadOpportunity();
      }, [id]);

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
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Go Back
            </button>
          </div>
        );
      }

      return (
        <div className="container mx-auto p-4 max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to opportunities
          </button>

          {loading ? (
            <SkeletonDetail />
          ) : opportunity ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-6 mb-8">
                <img
                  src={opportunity.logoUrl || "https://via.placeholder.com/80"}
                  alt={opportunity.orgName}
                  className="w-20 h-20 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {opportunity.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {opportunity.orgName}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      Posted: {formatDate(opportunity.datePosted)}
                    </span>
                    <span>Views: {opportunity.viewsCount}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  About the Opportunity
                </h2>
                <p className="text-gray-700 whitespace-pre-line mb-6">
                  {opportunity.description}
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Ideal Candidate
                  </h3>
                  <p className="text-blue-700">{opportunity.idealCandidate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {opportunity.responsibilities
                      .split("\n")
                      .map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Requirements
                  </h3>
                  <p className="text-gray-700">{opportunity.requirements}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Location
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.location.map((loc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-gray-700">
                    {opportunity.whenAndWhere}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Organization Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="font-medium">Contact Email:</p>
                    <p>{opportunity.orgEmail}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p>{opportunity.orgPrimaryPhone}</p>
                  </div>
                  <div>
                    <p className="font-medium">Posted By:</p>
                    <p>{opportunity.createdBy}</p>
                  </div>
                  <div>
                    <p className="font-medium">Deadline:</p>
                    <p>{formatDate(opportunity.deadline)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No opportunity found with this ID</p>
            </div>
          )}
        </div>
      );
    };

    export default OpportunityDetail;