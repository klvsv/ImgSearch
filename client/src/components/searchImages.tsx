import axios from "axios";

export const searchImages = async (userSearch: string) => {
	try {
		const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_GOOGLE_SEARCH_ID}&q=${userSearch}&searchType=image&num=10`);

		console.log("Response data:", response.data);
		const formattedSearchTime = response.data.searchInformation.formattedSearchTime;

		let suggestedSearch = "";
		if (response.data.spelling && response.data.spelling.correctedQuery) {
			suggestedSearch = response.data.spelling.correctedQuery;
		}

		const images = response.data.items.map((item: any) => ({
			link: item.link,
			title: item.title,
		}));
		return { images, suggestedSearch, searchTime: formattedSearchTime };
	} catch (error) {
		console.log("Error fetching images", error);
		throw error;
	}
};
