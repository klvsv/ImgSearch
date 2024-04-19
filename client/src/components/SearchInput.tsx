import { useState, useEffect } from "react";
import SearchButton from "./SearchButton";
import Suggestion from "./Suggestion";
import { searchImages } from "./searchImages";
import "../styles/SearchInput.css";

const SearchInput = ({ onSearch }: { onSearch: (query: string) => void }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState({
		items: [],
		searchInformation: {
			formattedSearchTime: "",
		},
	});
	const [suggestedSearch, setSuggestedSearch] = useState<string>("");

	useEffect(() => {
		if (searchQuery) {
			searchImages(searchQuery)
				.then(({ images, suggestedSearch, searchTime }) => {
					setSearchResults({ items: images, searchInformation: { formattedSearchTime: searchTime } });
					setSuggestedSearch(suggestedSearch || searchQuery);
				})
				.catch((error) => {
					console.error("Error fetching suggestions:", error);
				});
		} else {
			setSearchResults({
				items: [],
				searchInformation: {
					formattedSearchTime: "",
				},
			});
		}
	}, [searchQuery]);

	const handleSearch = () => {
		onSearch(searchQuery);
	};

	const handleSuggestedSearch = () => {
		setSearchQuery(suggestedSearch);
		onSearch(suggestedSearch);
	};

	return (
		<div className="search-input-container">
			<input
				type="text"
				placeholder="Find your next favorite image.."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<SearchButton onClick={handleSearch} />
			{suggestedSearch && (
				<Suggestion
					suggestedSearch={suggestedSearch}
					onSuggestedSearch={handleSuggestedSearch}
				/>
			)}
		</div>
	);
};

export default SearchInput;
