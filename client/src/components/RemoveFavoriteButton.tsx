import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

interface RemoveFavoriteButtonProps {
	imageLink: string;
}

const RemoveFavoriteButton: React.FC<RemoveFavoriteButtonProps> = ({ imageLink }) => {
	const { user } = useAuth0();

	const removeFavorite = async () => {
		if (user) {
			const userId = user.sub;
			try {
				await axios.delete(`http://localhost:3000/users/${userId}/favorites/${encodeURIComponent(imageLink)}`);
			} catch (error) {
				console.error("Error removing favorite:", error);
			}
		}
	};

	return <button onClick={removeFavorite}>Remove Favorite</button>;
};

export default RemoveFavoriteButton;
