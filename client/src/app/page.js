'use client';
import { useState } from 'react';
import RecipeCard from './components/RecipeCard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
	const [searchTerm, setSearchTerm] = useState('');
	const [recipes, setRecipes] = useState([]);
	const [history, setHistory] = useState([]);
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);

	const fetchRecipes = async () => {
		if (!searchTerm.trim()) return;

		try {
			const response = await fetch(
				`${API_BASE_URL}/recipes/search?searchTerm=${encodeURIComponent(
					searchTerm
				)}`
			);
			if (!response.ok) throw new Error('Failed to fetch recipes');

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching recipes:', error);
		}
	};

	const fetchHistory = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/history`);
			if (!response.ok) throw new Error('Failed to fetch history');

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching history**:', error);
		}
	};

	const handleViewSearchHistory = async () => {
		try {
			const data = await fetchHistory();
			if (data) {
				setHistory(data);
				setIsHistoryOpen(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await fetchRecipes();
		if (data) {
			setRecipes(data);
		}
	};

	const handleReset = () => {
		setSearchTerm('');
		setRecipes([]);
	};
	return (
		<div className="mt-[100px] mx-[150px] font-[family-name:var(--font-geist-sans)]">
			<header className="">
				<h1 className="text-6xl text-center font-bold">Nutrition Wizard</h1>
			</header>

			<main className="mt-4">
				<section id="main" className="">
					<h2 className="text-center text-lg font-semibold text-gray-600">
						Find the three lowest-calorie recipes with any ingredient.
					</h2>
					<p className="text-center text-lg font-semibold text-gray-600">
						Start by entering an ingredient.
					</p>

					<form
						className="flex flex-col mt-8"
						onSubmit={(e) => handleSubmit(e)}
					>
						<input
							type="text"
							placeholder="Enter an ingredient..."
							className="border-solid w-1/2 h-10 mx-auto pl-2 rounded"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							type="submit"
							className="bg-red-600 text-white mt-8 px-6 py-3 rounded font-semibold mx-auto"
						>
							Find Recipes
						</button>
					</form>
				</section>

				<section id="recipes-section" className="mt-32">
					<div className="flex justify-between items-center">
						<h3 className="text-2xl font-bold">Low-Calorie Recipes</h3>
						<button
							type="button"
							className="px-6 py-2 font-semibold text-gray-600"
							onClick={handleReset}
						>
							Reset
						</button>
					</div>

					<hr className="my-4" />

					<div className="recipe-list">
						{recipes.length !== 0 ? (
							recipes.map((recipe, index) => (
								<RecipeCard key={index} recipe={recipe} />
							))
						) : (
							<div className="w-full h-[250px] flex justify-center items-center">
								<p className="text-center italic text-gray-400">
									Search an ingredient to find some recipes
								</p>
							</div>
						)}
					</div>
				</section>

				<hr />

				<section id="history-section" className="mt-32">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-2xl font-bold">Search History</h3>
							<p>View the last 10 items in your search history.</p>
						</div>

						<button
							className="bg-blue-600 text-white px-6 py-3 rounded font-semibold"
							onClick={handleViewSearchHistory}
						>
							View Search History
						</button>
					</div>

					<hr className="my-4" />

					<div className="history-list">
						{history.length !== 0 &&
							history.map((item, index) => (
								<div key={`${index}-${item.searchTerm}`} className="mb-4">
									<div className="flex">
										<p className="font-medium">Searched Ingredient:</p>
										<p className="pl-4">{item.searchTerm}</p>
									</div>

									<p className="font-medium">Recipes:</p>
									<ul>
										{item.recipes.map((recipe, index) => (
											<li
												key={`${index}-${recipe.name}`}
											>{`- ${recipe.name}`}</li>
										))}
									</ul>
									<p className="font-medium">
										Search Date:{' '}
										<span className="font-normal">
											{new Date(item.searchDate).toLocaleString()}
										</span>
									</p>
								</div>
							))}
					</div>
				</section>
			</main>
		</div>
	);
}
