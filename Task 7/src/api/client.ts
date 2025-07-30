import type { Opportunity } from "../types/opportunity";

const API_BASE_URL = "https://akil-backend.onrender.com";

export const fetchOpportunities = async (): Promise<Opportunity[]> => {
  const response = await fetch(`${API_BASE_URL}/opportunities/search`);
  if (!response.ok) {
    throw new Error("Failed to fetch opportunities");
  }
  const data = await response.json();
  return data.data as Opportunity[];
};

export const fetchOpportunityById = async (
  id: string
): Promise<Opportunity> => {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch opportunity with id ${id}`);
  }
  const data = await response.json();
  return data.data as Opportunity;
};
