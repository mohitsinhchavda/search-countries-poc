import { useState } from 'react';
import Header from "../components/SearchContainer/Header.js";
import CountriesTable from "../components/SearchContainer/CountriesTable.js";
import Pagination from "../components/SearchContainer/Pagination.js"

function SearchContainer() {

    const [searchQuery, setSearchQuery] = useState("");

    const [isFetched, setIsFetched] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [isErrorWhileFetching, setIsErrorWhileFetching] = useState(false);

    const [searchResults, setSearchResults] = useState([]);

    const [pages, setPages] = useState([]);

    const [currentPage, setCurrentPage] = useState();


    return (
        <div className='container'>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSearchResults={setSearchResults}
                setIsFetching={setIsFetching}
                setIsErrorWhileFetching={setIsErrorWhileFetching}
                setIsFetched={setIsFetched}
                isFetched={isFetched}
                setPages={setPages}
            />
            <CountriesTable
                searchResults={searchResults}
                searchQuery={searchQuery}
                isFetching={isFetching}
                isFetched={isFetched}
                currentPage={currentPage}
                isErrorWhileFetching={isErrorWhileFetching}
                setPages={setPages}
            />
            <Pagination
                searchResults={searchResults}
                pages={pages}
                setPages={setPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                isFetched={isFetched}
            />
        </div>
    );
}

export default SearchContainer;
