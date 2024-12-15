import { IProjectDetails } from "../utils/types";

// The API endpoint
const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

// API Fetcher

export const fetchProjects = async (): Promise<IProjectDetails[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data: any[] = await response.json();

    const projects: IProjectDetails[] = data.map((eachProject) => ({
      sNo: eachProject["s.no"],
      amtPledged: eachProject["amt.pledged"],
      percentageFunded: eachProject["percentage.funded"],
    }));

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch project details");
  }
};
