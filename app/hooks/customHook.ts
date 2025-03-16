import { useEffect, useState } from "react";
import { searchMedia, Result } from "@/lib/tmdb";
import { useRouter } from "next/navigation";

export function useSearch() {
    
    const [isDropdownActive , setIsDropdownActive] = useState<boolean>(false); // track if the search dropdown is active
    const [inputValue, setInputValue] = useState<string>(""); // store the user's input value
    const [searchResults, setSearchResults] = useState<Result[]>([]); // store the search results 
    const [isLoading, setIsLoading] =  useState<boolean>(false); // track loading status during API fetch
    const [debouncedValue, setDebouncedValue] = useState<string>("");  // store debounced input value (delayed to reduce API calls)
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const router = useRouter();

    // Function to handle user input changes
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsDropdownActive(true); // Activate search dropdown on input
    };

    // Function to handle enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/search?query=${encodeURIComponent(inputValue)}`);
            handleReset();
        }   
    };

    // Function to close the result dropdown if user clicks outside the search input field
    const handleBlur = () => {
        setTimeout(() => setIsDropdownActive(false), 200); 
    };

    // Function to open the result dropdown when user clicks inside the input field
    const handleFocus = () => {
        setIsDropdownActive(true);
    };

    // Function to reset input field after search has been fetched
    const handleReset = () => {
        if (!isLoading) {
            setInputValue('');
            setSearchResults([]); 
            setDebouncedValue("");
        }
    };

    // Debounce user input (delay search execution)
    useEffect(() => {
        // If input is empty, reset values and avoid API calls
        if (!inputValue.trim()) {
            setSearchResults([]); 
            setDebouncedValue('');
            setHasFetched(false);
        } 

        const timeout = setTimeout(() => {
            setDebouncedValue(inputValue.trim()); 
        }, 800); // .8-second delay before setting debounced value

        return () => {clearTimeout(timeout)}
        
    }, [inputValue]); // Runs when inputValue changes

    // Fetch search results when debounced value updates
    useEffect(() => {          
        if (debouncedValue.length < 2) {
            setSearchResults([]);  
            setIsLoading(false);
            return;  
        }
        setIsLoading(true);
        
        const fetchResults = async () => {
            try {
                const { results } = await searchMedia(debouncedValue); // Fetch results from API
                setSearchResults(results); // Update state with search results
            } catch (error) {
                console.error("Search fetch error:", error); 
                setSearchResults([]); 
            } finally {
                setIsLoading(false); 
                setHasFetched(true);
            }        
        };
        fetchResults();
    }, [debouncedValue]); // Runs when debounced value changes

    return { 
        searchResults, 
        handleInput, 
        handleKeyDown,
        inputValue, 
        isDropdownActive, 
        handleBlur, 
        handleFocus, 
        handleReset, 
        isLoading,
        debouncedValue,
        hasFetched
    };
}

// Hook to manage the navbar's state (toggle menu open/close)
export function useNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    
    // Function to toggle menu open/close state
    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return { isMenuOpen, handleToggle };
}
