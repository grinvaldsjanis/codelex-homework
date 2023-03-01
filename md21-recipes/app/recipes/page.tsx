import { GetStaticProps } from 'next';
import { IRecipe } from "../utils/types"

interface Props {
  recipes: IRecipe[];
}

export default function RecipesPage({ recipes }: Props) {
  return (
    <div>
      <h1>Recipes  {`Recipes data: ${recipes}`}</h1>
      
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch('/api/recipes');
  const recipes = await response.json();

  return {
    props: { recipes },
    revalidate: 60,
  };
};
