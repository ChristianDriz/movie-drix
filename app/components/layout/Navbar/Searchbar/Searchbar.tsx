import SearchResult from "./SearchResult"
import { Result } from "@/lib/tmdb"

type Props = {
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputValue: string;
    searchResults: Result[];
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDropdownActive: boolean;
    handleReset: () => void;
    isLoading: boolean;
    debouncedValue: string;
    hasFetched: boolean
}

export default function Searchbar(
        { 
            handleInput,
            handleKeyDown, 
            inputValue, 
            searchResults, 
            handleBlur, 
            handleFocus, 
            isDropdownActive, 
            handleReset,
            isLoading,
            debouncedValue,
            hasFetched
        } : Props ) {
    return (
        <div className="bg-midnight w-full xl:w-auto xl:grow xl:order-2 max-w-2xl relative">
            <input 
                value={inputValue}
                onChange={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                type="text" 
                placeholder="Search here..."
                className="px-3 py-2 w-full bg-black rounded-xl outline-none xl:px-4 xl:py-3"
            />
            <SearchResult 
                searchResults={searchResults}
                isDropdownActive={isDropdownActive}
                handleReset={handleReset}
                isLoading={isLoading}
                inputValue={inputValue}
                debouncedValue={debouncedValue}
                hasFetched={hasFetched}
            />
        </div>
    )
}
