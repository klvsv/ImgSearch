const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const Joi = require("joi");
const app = express();

app.use(cors());
app.use(express.json());

// Middleware to decode URL parameters
app.use((req, res, next) => {
	for (const key in req.params) {
		req.params[key] = decodeURIComponent(req.params[key]);
	}
	next();
});

const usersFile = "users.json";

// Define a Joi schema for the DELETE request parameters
const deleteSchema = Joi.object({
	userId: Joi.string().required(),
	link: Joi.string().uri().required(),
});

// Define a Joi schema for the POST request body
const addFavoriteSchema = Joi.object({
	link: Joi.string().uri().required(),
});

app.delete("/users/:userId/favorites/:link", async (req, res) => {
	const userId = req.params.userId;
	const link = req.params.link;

	try {
		const usersData = await fs.readFile(usersFile, "utf8");
		let users = JSON.parse(usersData);

		const userIndex = users.users.findIndex((user) => user.userId === userId);
		if (userIndex === -1) {
			return res.status(404).send({ message: "User not found" });
		}

		const favoriteIndex = users.users[userIndex].favorites.findIndex((favorite) => favorite.link === link);
		if (favoriteIndex === -1) {
			return res.status(404).send({ message: "Favorite not found" });
		}

		users.users[userIndex].favorites.splice(favoriteIndex, 1);

		await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
		res.status(200).send({ message: "Successfully removed favorite!" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send({ message: "Error occurred removing favorite :(" });
	}
});

app.post("/users/:userId/favorites", async (req, res) => {
	const userId = req.params.userId;
	const { link } = req.body;

	try {
		const usersData = await fs.readFile(usersFile, "utf8");
		let users = JSON.parse(usersData);

		let userIndex = users.users.findIndex((user) => user.userId === userId);
		if (userIndex === -1) {
			users.users.push({ userId, favorites: [{ link, title: "Favorite Image" }] });
			userIndex = users.users.length - 1;
		} else {
			if (users.users[userIndex].favorites.some((favorite) => favorite.link === link)) {
				return res.status(400).send({ message: "Favorite already exists" });
			}

			users.users[userIndex].favorites.push({ link, title: "Favorite Image" });
		}

		await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
		res.status(200).send({ message: "Successfully added favorite!" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send({ message: "Error occurred adding favorite :(" });
	}
});

app.get("/users/:userId/favorites", async (req, res) => {
	const userId = req.params.userId;

	try {
		const usersData = await fs.readFile(usersFile, "utf8");
		const users = JSON.parse(usersData);

		const user = users.users.find((user) => user.userId === userId);

		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		res.status(200).send(user.favorites);
	} catch (error) {
		console.error("Error fetching favorites:", error);
		res.status(500).send({ message: "Error occurred fetching favorites :(" });
	}
});

app.listen(3000, () => {
	console.log("Server is running - you better catch it at http://localhost:3000");
});
