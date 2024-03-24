export interface SearchResultItem {
	link: string;
	title: string;
}

export interface SearchResultsData {
	items: SearchResultItem[];
	searchInformation: {
		formattedSearchTime: string;
	};
}

export interface SearchResultsProps {
	searchResults: SearchResultsData;
}
