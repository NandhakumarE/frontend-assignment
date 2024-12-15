import { useCallback } from "react";
import { EMPTY_PALCEHOLDER } from "../../utils/constants";

const FIRST_PAGE = 1;

const usePagination = (currentPage: number, totalPageCount: number) => {
  // Helper function to generate a range of page numbers
  const generatePages = (from: number, to: number): string[] => {
    const generatedPages: string[] = [];
    for (let page = from; page <= to; page++) {
      generatedPages.push(page.toString());
    }
    return generatedPages;
  };

  const getPages = useCallback(
    (currentPage: number, totalPageCount: number) => {
      const firstPage = FIRST_PAGE.toString();
      const lastPage = totalPageCount.toString();
      let pages: string[] = [];

      if (totalPageCount <= 7) {
        // If total pages are 7 or fewer, show all page numbers
        pages = generatePages(FIRST_PAGE, totalPageCount);
      } else if (currentPage <= 4) {
        // If on the first few pages, show first 5 pages, "..." and last page
        pages = [
          ...generatePages(FIRST_PAGE, FIRST_PAGE + 4),
          EMPTY_PALCEHOLDER,
          lastPage,
        ];
      } else if (currentPage >= totalPageCount - 4) {
        // If on the last few pages, show first page, "...", and last 5 pages
        pages = [
          firstPage,
          EMPTY_PALCEHOLDER,
          ...generatePages(totalPageCount - 4, totalPageCount),
        ];
      } else {
        // If in the middle, show first page, "...", 3 pages around currentPage, "...", and last page
        pages = [
          firstPage,
          EMPTY_PALCEHOLDER,
          ...generatePages(currentPage - 1, currentPage + 1),
          EMPTY_PALCEHOLDER,
          lastPage,
        ];
      }
      return pages;
    },
    []
  );

  return {
    disablePrev: currentPage == FIRST_PAGE,
    disableNext: currentPage === totalPageCount,
    pages: getPages(currentPage, totalPageCount),
  };
};

export default usePagination;
