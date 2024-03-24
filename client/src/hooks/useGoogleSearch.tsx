import { useState } from "react";

export const useGoogleSearch = () => {
	const [searchResults, setSearchResults] = useState({
		items: [],
		searchInformation: {
			formattedSearchTime: "",
		},
	});
	const [isLoading, setIsLoading] = useState(false);
	const [searchError, setSearchError] = useState<Error | null>(null);

	const handleSearch = async (searchQuery: string) => {
		setIsLoading(true);
		setSearchError(null);

		try {
			const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_GOOGLE_SEARCH_ID}&num=10&searchType=image&q=${searchQuery}`);
			const data = await response.json();

			const formattedSearchTime = data.searchInformation ? data.searchInformation.formattedSearchTime : "";
			setSearchResults({
				items: data.items || [],
				searchInformation: {
					formattedSearchTime,
				},
			});
		} catch (error: any) {
			setSearchError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { searchResults, isLoading, searchError, handleSearch };
};
