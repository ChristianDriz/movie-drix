
import { Result } from "@/lib/tmdb";

import SearchLoading from "./SearchLoading";
import SearchtItem from "./SearchItem";
import SearchNoResult from "./SearchNoResult";
import SearchViewAll from "./SearchViewAll";

type Props = {
    searchResults: Result[];
    isDropdownActive: boolean;
    handleReset: () => void;
    isLoading: boolean;
    inputValue: string;
    debouncedValue: string;
    hasFetched: boolean;
};

export default function SearchResult({ searchResults, isDropdownActive, handleReset, isLoading, inputValue, debouncedValue, hasFetched }: Props) {
    
    // Hide the result if input is less than 2 characters or dropdown is inactive
    if (inputValue.trim().length < 2 || !isDropdownActive) return null;

    return (
        <div className="absolute inset-x-0 bg-midnight z-10">
            {/* Show loading indicator when fetch is in progress */}
            {isLoading && <SearchLoading />}

            {/* Show results list when done loading and there are results */}
            {!isLoading && searchResults.length > 0 && (
                <ul className="p-2">
                    {searchResults.slice(0, 5).map((result, index) => (
                        <SearchtItem
                            key={index}
                            id={result.id}
                            media_type={result.media_type}
                            poster_path={result.poster_path}
                            title={result.title || result.name || ""}
                            release_date={result.release_date || result.first_air_date || ""}
                            handleReset={handleReset}
                        />
                    ))}
                    {/* Show "View All" link if there’s at least one result */}
                    {searchResults.length >= 5 && (
                        <SearchViewAll query={debouncedValue} handleReset={handleReset} />
                    )}
                </ul>
            )}
            {/* Show "No Results" when done loading, fetch has completed, and no results */}
            {!isLoading && hasFetched && searchResults.length === 0 && (
                <SearchNoResult inputValue={debouncedValue} />
            )}
        </div>
    )
}
