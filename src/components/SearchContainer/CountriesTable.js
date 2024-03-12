import { memo, useCallback, useMemo, useState } from "react";
import { usePaginationPivotsForCurrentPage } from "../../utils/hooks";

function CountriesTable({
    searchResults = [],
    searchQuery,
    isFetching,
    isFetched,
    isErrorWhileFetching,
    currentPage,
    setPages,
}) {
    const [sortedAsc, setSortedAsc] = useState();

    const searchResultsAvailable = useMemo(() => {
        return Array.isArray(searchResults) && searchResults.length
    }, [searchResults]);

    const { leftPivot, rightPivot } = usePaginationPivotsForCurrentPage(currentPage);

    // manipulating search results based upon current active page
    // and current state of sorting with temp storage
    const searchResultsForCurrentPage = useMemo(() => {
        // cherry-picking elements of array based upon current page's pivots
        let arr = Array.isArray(searchResults) && searchResults.length ? searchResults?.slice(leftPivot, rightPivot) : [];
        // sorting logic
        if (sortedAsc) {
            arr = [...arr.sort((a, b) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()))]
        }
        // we are managing 3 values true, false, undefined (for default results without sorting)
        else if (sortedAsc === false) {
            arr = [...arr.sort((a, b) => b.name.common.toLowerCase().localeCompare(a.name.common.toLowerCase()))]
        }

        return arr;
    }, [searchResults, leftPivot, rightPivot, sortedAsc]);

    // toggle sorting
    const onClickSort = useCallback(() => {
        setPages(1);
        setSortedAsc((prevValue) => !prevValue);
    }, []);

    return (
        searchQuery
            ?
            <main className="main">
                {
                    isErrorWhileFetching
                        ?
                        <h4 className="text-red">
                            Something went wrong fetching the countries.
                        </h4>
                        :
                        isFetching
                            ?
                            <h4>Fecthing data...</h4>
                            :
                            isFetched && searchResultsAvailable
                                ?
                                <table>
                                    <thead className="position-sticky bg-white">
                                        <tr>
                                            <th>No.</th>
                                            <th
                                                className="text-left cursor-pointer"
                                                onClick={onClickSort}
                                                title={!sortedAsc ? "Sort A -> Z" : "Sort Z -> A"}
                                            >
                                                Country Name {sortedAsc ? <span> &darr; </span> : <span>&uarr;</span>}
                                            </th>
                                            <th>Country Flag</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            searchResultsAvailable
                                                ?
                                                searchResultsForCurrentPage.map(({ flags, name, cca3 }, index) => {
                                                    return (
                                                        <tr key={name.common+cca3}>
                                                            <td>{leftPivot + index + 1}.</td>
                                                            <td>{name.common}</td>
                                                            <td>
                                                                <div>
                                                                    <img src={flags.png} alt={flags.png} className="country-flag box-shadow" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </tbody>
                                </table>
                                :
                                isFetched && Array.isArray(searchResults) && searchResults.length === 0
                                    ?
                                    <h4>No results found for <span className="bold italic">{searchQuery}</span></h4>
                                    :
                                    null
                }
            </main>
            :
            null
    );
}

export default memo(CountriesTable);
