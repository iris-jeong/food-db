import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: String,
	image: String,
	calories: Number,
	carbohydrate: Number,
	protein: Number,
	fat: Number,
});

const searchHistorySchema = new mongoose.Schema({
	searchTerm: { type: String, required: true },
	recipes: [recipeSchema],
	searchDate: { type: Date, required: true, default: Date.now },
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

export { SearchHistory };
