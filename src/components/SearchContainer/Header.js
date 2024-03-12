import { useCallback, useRef, memo, useEffect } from "react";

function Header({
    searchQuery,
    setSearchQuery,
    setSearchResults,
    setIsFetching,
    setIsErrorWhileFetching,
    setIsFetched,
    setPages,
}) {

    // timer used to debounce the API call
    const timerRef = useRef();

    // API call to fetch countries 
    const fetchCountries = useCallback(async (value) => {
        try {
            if (value) {
                setIsFetching(true);
                setIsErrorWhileFetching(false);
                const interimResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/name/${value}`);
                const response = await interimResponse.json();
                if (Array.isArray(response)) {
                    setSearchResults(() => response);
                }
                else if (response?.message === "Not Found") {
                    setSearchResults([]);
                }
                else {
                    throw new Error(response?.message || "Something went wrong")
                }
            }
        }
        catch {
            setIsErrorWhileFetching(true);
            setPages([]);
        }
        finally {
            setIsFetching(false);
            setIsFetched(true);
        }
    }, []);

    // on change logic including the debounce logic for API call
    const onSearchInputChange = useCallback((e) => {
        setIsFetched(false);
        setIsErrorWhileFetching(false);
        setPages([]);
        setSearchResults([]);
        const inputValue = e.target.value
        setSearchQuery(() => inputValue);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => fetchCountries(inputValue), 1500);
    }, [setIsFetched, setIsErrorWhileFetching, setPages, setSearchResults, setSearchQuery, fetchCountries]);

    // focus on search input clicking on cmd+k or ctrl+k
    const onKeyDownCb = useCallback((e) => {
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 75) {
            e.preventDefault(); 
            document.getElementById('search').focus();
        }
    }, []);

    // even binding for focusing on search input
    useEffect(() => {
        window.addEventListener('keydown', onKeyDownCb);
        return () => {
            window.removeEventListener('keydown', onKeyDownCb);
        };
    }, [onKeyDownCb]);



    return (
        <header>
            <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={onSearchInputChange}
                placeholder="Start searching"
            />
        </header>
    );
}

export default memo(Header);
