import express from 'express';
import { SearchHistory } from '../models/SearchHistory.js';

const router = express.Router();

// GET /api/history
// Fetch the search term history
router.get('/', async (req, res) => {
	try {
		const history = await SearchHistory.find()
			.sort({ searchDate: -1 })
			.limit(10);
		console.log(history);
		res.json(history);
	} catch (error) {
		console.error('Error fetching search history:', error);
		res.status(500).json({ message: 'Server Error' });
	}
});

export default router;
