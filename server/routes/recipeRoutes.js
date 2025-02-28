import express from 'express';
import getAccessToken from '../config/fatsecret.js';
import { SearchHistory } from '../models/SearchHistory.js';

const router = express.Router();

const FATSECRET_API_URL =
	'https://platform.fatsecret.com/rest/recipes/search/v3';

// GET /api/recipes/search
// Fetch recipes by keyword
router.get('/search', async (req, res) => {
	const { searchTerm } = req.query;

	if (!searchTerm) {
		return res.status(400).json({ error: 'Search term is required' });
	}

	// Make the request to FatSecret API with search term
	try {
		const accessToken = await getAccessToken();
		if (!accessToken) {
			return res.status(500).json({ error: 'Failed to retrieve access token' });
		}

		const response = await fetch(
			`${FATSECRET_API_URL}?must_have_images=true&search_expression=${encodeURIComponent(
				searchTerm
			)}&sort_by=caloriesPerServingAscending&max_results=3&format=json`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`FatSecret API error: ${response.statusText}`);
		}

		const data = await response.json();
		const recipes = data.recipes.recipe.map((recipe) => ({
			name: recipe.recipe_name,
			description: recipe.recipe_description,
			image: recipe.recipe_image,
			calories: recipe.recipe_nutrition.calories,
			carbohydrate: recipe.recipe_nutrition.carbohydrate,
			protein: recipe.recipe_nutrition.protein,
			fat: recipe.recipe_nutrition.fat,
		}));

		// Save the search term and retrieved recipes to database
		await SearchHistory.create({ searchTerm, recipes });

		// Send recipes data back to front end
		res.json(recipes);
	} catch (error) {
		console.error('Error retrieving recipes:', error);
		res.status(500).json({ error: 'Failed to retrieve recipes' });
	}
});

export default router;
