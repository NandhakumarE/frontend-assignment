import { useState, useEffect } from "react";
import { IProjectDetails } from "../../utils/types";
import { fetchProjects } from "../../services/KickstarterProjects.api";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";

const INITIAL_PAGE = 1;

const useKickStarterProjects = () => {
  const [overallData, setOverallData] = useState<IProjectDetails[]>([]);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const projects = await fetchProjects();
        setOverallData(projects);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to load projects:", error);
      }
    };
    loadProjects();
  }, []);

  const calculateStartAndEndIndices = (
    page: number,
    pageSize: number = DEFAULT_PAGE_SIZE
  ): { start: number; end: number } => {
    const start = Math.max((page - 1) * pageSize, 0); // Zero-based index
    const end = Math.min(start + pageSize, overallData.length); // Ensure `end` is within bounds
    return { start, end };
  };

  const getPaginatedData = (pageSize: number = DEFAULT_PAGE_SIZE) => {
    const { start, end } = calculateStartAndEndIndices(page, pageSize);
    return overallData.slice(start, end);
  };

  const constructShowingMessage = (
    page: number,
    pageSize: number = DEFAULT_PAGE_SIZE
  ) => {
    const { start, end } = calculateStartAndEndIndices(page, pageSize);
    const totalCount = overallData.length;
    return `Showing ${start + 1} - ${end} of ${totalCount}`;
  };

  return {
    page,
    isLoading,
    totalPageCount: Math.ceil(overallData.length / DEFAULT_PAGE_SIZE),
    setPage,
    getPaginatedData,
    constructShowingMessage,
  };
};

export default useKickStarterProjects;
