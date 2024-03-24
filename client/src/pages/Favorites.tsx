import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Favorites.css";

interface Favorite {
	link: string;
	title: string;
}

const Favorites: React.FC = () => {
	const { user } = useAuth0();
	const [favorites, setFavorites] = useState<Favorite[]>([]);

	useEffect(() => {
		if (user) {
			const userId = user.sub;
			fetchFavorites(userId);
		}
	}, [user]);

	const fetchFavorites = async (userId: string | undefined) => {
		if (userId) {
			try {
				console.log("Fetching favorites for userId:", userId);
				const response = await axios.get(`http://localhost:3000/users/${userId}/favorites`);
				console.log("Received favorites:", response.data);
				setFavorites(response.data);
			} catch (error) {
				console.error("Error fetching favorites:", error);
			}
		}
	};

	const removeFavorite = async (imageLink: string | undefined) => {
		if (user && imageLink) {
			const userId = user.sub;
			try {
				await axios.delete(`http://localhost:3000/users/${userId}/favorites/${encodeURIComponent(imageLink)}`);
				fetchFavorites(userId);
			} catch (error) {
				console.error("Error removing favorite:", error);
			}
		}
	};

	return (
		<div>
			<h2>Your Favorites</h2>
			<div className="favorites-grid">
				{favorites.map((favorite, index) => (
					<div
						className="image-container"
						key={index}
					>
						<img
							src={favorite.link}
							alt={favorite.title}
						/>

						<button onClick={() => removeFavorite(favorite.link)}>Remove Favorite</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
