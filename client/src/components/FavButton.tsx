import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const FavButton: React.FC<{ isFavorite: boolean; onToggle: () => void; imageLink: string }> = ({ isFavorite, onToggle, imageLink }) => {
	const { user } = useAuth0();
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [buttonText, setButtonText] = useState(isFavorite ? "Remove from Favorites" : "Add to Favorites");

	const toggleFavorite = async () => {
		if (user) {
			const userId = user.sub;
			try {
				if (isFavorite) {
					await axios.delete(`http://localhost:3000/users/${userId}/favorites/${encodeURIComponent(imageLink)}`);
					console.log("Successfully removed from favorites");
					setButtonText("Add to Favorites");
				} else {
					await axios.post(`http://localhost:3000/users/${userId}/favorites`, { link: imageLink });
					console.log("Successfully added to favorites");
					setButtonText("Added");
				}
				onToggle();
				setIsButtonDisabled(true);
			} catch (error) {
				console.error("Error toggling favorite:", error);
			}
		}
	};

	return (
		<button
			disabled={isButtonDisabled}
			onClick={toggleFavorite}
		>
			{buttonText}
		</button>
	);
};

export default FavButton;
