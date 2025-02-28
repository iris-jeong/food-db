import Image from 'next/image';
import { Flame, Beef, Pizza, Wheat } from 'lucide-react';

export default function RecipeCard({ recipe }) {
	return (
		<>
			<div className="flex">
				<div className="w-4/5 pr-8">
					<h3 className="text-[20px] font-bold">{recipe.name}</h3>
					<p className="text-gray-600">{recipe.description}</p>

					<div className="flex justify-between mt-8">
						<div className="flex flex-col justify-center items-center">
							<Flame className="w-6 h-6" />
							<p className="font-semibold text-lg py-2">
								350 <span className="text-sm">kcal</span>
							</p>
							<p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-600">
								Calories
							</p>
						</div>

						<div className="flex flex-col justify-center items-center">
							<Beef className="w-6 h-6" />
							<p className="font-semibold text-lg py-2">
								{recipe.protein} <span className="text-sm">g</span>
							</p>
							<p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-600">
								Protein
							</p>
						</div>

						<div className="flex flex-col justify-center items-center">
							<Pizza className="w-6 h-6" />
							<p className="font-semibold text-lg py-2">
								{recipe.fat} <span className="text-sm">g</span>
							</p>
							<p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-600">
								Fat
							</p>
						</div>

						<div className="flex flex-col justify-center items-center">
							<Wheat className="w-6 h-6" />
							<p className="font-semibold text-lg py-2">
								{recipe.carbohydrates} <span className="text-sm">g</span>
							</p>
							<p className="font-[family-name:var(--font-geist-mono)] text-sm text-gray-600">
								Carbs
							</p>
						</div>
					</div>
				</div>

				<div className="w-[600px] h-[250px] overflow-hidden rounded-lg">
					<Image
						src={recipe.image}
						alt={recipe.name}
						width={500}
						height={250}
						priority
					/>
				</div>
			</div>
			<hr className="my-4" />
		</>
	);
}
