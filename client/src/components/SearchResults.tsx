import React from "react";
import { SearchResultsProps } from "../types/SearchResultsProps";
import FavButton from "./FavButton";
import "../styles/SearchResults.css";

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
	return (
		<div className="search-results">
			{searchResults.searchInformation.formattedSearchTime && <p className="search-time">Your search took {searchResults.searchInformation.formattedSearchTime} seconds</p>}
			{searchResults.items.map((item, index) => (
				<div
					key={index}
					className="image-container"
				>
					<img
						src={item.link}
						alt={item.title}
						onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
							const target = e.target as HTMLImageElement;
							target.src = "/no-image.webp";
						}}
					/>
					<div className="title">
						<p>{item.title}</p>
					</div>
					<FavButton
						isFavorite={false}
						onToggle={() => {}}
						imageLink={item.link}
					/>
				</div>
			))}
		</div>
	);
};

export default SearchResults;
