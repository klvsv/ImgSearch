import { SearchResultItem } from "./SearchResultItem";

export type SearchContainerProps = {
	searchResults: {
		items: SearchResultItem[];
		searchInformation: {
			formattedSearchTime: string;
		};
	};
	onSearch: (results: { items: SearchResultItem[]; searchInformation: { formattedSearchTime: string } }) => void;
};
