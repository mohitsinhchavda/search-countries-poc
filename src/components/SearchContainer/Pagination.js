import { memo, useCallback, useEffect } from "react";
import { COUNTRIES_PER_PAGE } from "../../utils";

function Pagination({
    searchResults = [],
    pages,
    setPages,
    setCurrentPage,
    currentPage,
    isFetched
}) {

    // whenever search results changes, we change number of pages as per
    // laster search results and set current page number to 1
    // along with filling up pages array
    useEffect(() => {
        const numberOfPages = Math.ceil(searchResults.length / COUNTRIES_PER_PAGE);
        setPages(Array.from({ length: numberOfPages }, (_, index) => index + 1));
        setCurrentPage(1);
    }, [searchResults, setPages, setCurrentPage]);

    // move to next page
    const onClickNext = useCallback(() => {
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    }, []);

    // move to previous page
    const onClickPrev = useCallback(() => {
        setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
    }, []);

    // move to 1st page
    const onClickFirst = useCallback((e) => {
        setCurrentPage(1);
    }, []);

    // move to available last page 
    const onClickLast = useCallback((e) => {
        setCurrentPage(pages.length);
    }, [pages.length, setCurrentPage]);


    return (
        Array.isArray(pages) && pages.length > 1 && isFetched
            ?
            <footer className="footer">
                <div>
                    Showing page no. {currentPage} of {pages.length}
                </div>
                <div>
                    <button onClick={onClickFirst} disabled={currentPage === 1} title="move to first page">
                        &lt; &lt;
                    </button>
                    <button onClick={onClickPrev} disabled={currentPage === 1} title="move to previous page">
                        &lt;
                    </button>
                    {currentPage} / {pages.length}
                    <button onClick={onClickNext} disabled={currentPage >= pages.length} title="move to next page">
                        &gt;
                    </button>
                    <button onClick={onClickLast} disabled={currentPage >= pages.length} title="move to last page">
                        &gt; &gt;
                    </button>
                </div>
            </footer>
            :
            null
    )
}

export default memo(Pagination);
