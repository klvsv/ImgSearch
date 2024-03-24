import React from "react";

interface SuggestionProps {
	suggestedSearch: string;
	onSuggestedSearch: () => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestedSearch, onSuggestedSearch }) => {
	return (
		<div>
			<p>
				Did you mean: <strong>{suggestedSearch}</strong>?
			</p>
			<button onClick={onSuggestedSearch}>Use Suggestion</button>
		</div>
	);
};

export default Suggestion;
