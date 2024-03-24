import React from "react";

interface SuggestedSearchProps {
	suggestedSearch: string;
	onSuggestedSearch: () => void;
}

const SuggestedSearch: React.FC<SuggestedSearchProps> = ({ suggestedSearch, onSuggestedSearch }) => {
	return (
		<p>
			Did you mean:{" "}
			<span
				style={{ cursor: "pointer", textDecoration: "underline" }}
				onClick={onSuggestedSearch}
			>
				{suggestedSearch}
			</span>
			?
		</p>
	);
};

export default SuggestedSearch;
