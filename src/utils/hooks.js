import { useMemo } from "react";
import { COUNTRIES_PER_PAGE } from ".";

export const usePaginationPivotsForCurrentPage = (currentPage) => {
    /**
      @param currentPage it is currently active page shown in the UI
      
      @returns Object {
        leftPivot index (of current page's 1st element) in reference with entire search results' array
        rightPivot index (of current page's last element) in reference with entire search results' array
      }
    */
    const leftPivot = useMemo(() => {
        return (currentPage - 1) * COUNTRIES_PER_PAGE
    }, [currentPage]);

    const rightPivot = useMemo(() => {
        return currentPage * COUNTRIES_PER_PAGE
    }, [currentPage]);
    return { leftPivot, rightPivot}
};