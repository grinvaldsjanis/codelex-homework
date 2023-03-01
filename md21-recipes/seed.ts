import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  ingredients: String,
});

const RecipeModel =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);

const MONGO_URI = "mongodb://localhost:27017/recipes-db";

async function seedData() {
  await mongoose.connect(MONGO_URI);

  mongoose.set("strictQuery", false);

  // Seed some fake data
  const recipes = [
    {
      title: "Tomato Bisque",
      image: "https://picsum.photos/id/231/200/300",
      ingredients:
        "4 tablespoons butter, 1/2 large onion, 1 medium carrot, 1/2 celery stalk, 4 garlic cloves, 2 tablespoons tomato paste, 5 tablespoons AP flour, 5 cups chicken stock,4 cups crushed tomato,3 parsely sprigs,3 thyme sprigs,2 bay leaves,2 teaspoons salt,1 teaspoon pepper",
    },
    {
      title: "Carrot and Cauliflower Soup",
      image: "https://picsum.photos/id/232/200/300",
      ingredients:
        "4 tablespoons butter, 1/2 large onion, 1 medium carrot, 1/2 celery stalk, 4 garlic cloves, 2 tablespoons tomato paste, 5 tablespoons AP flour, 5 cups chicken stock,4 cups crushed tomato,3 parsely sprigs,3 thyme sprigs,2 bay leaves,2 teaspoons salt,1 teaspoon pepper",
    },
    {
      title: "Pancakes",
      image: "https://picsum.photos/id/233/200/300",
      ingredients:
        "4 tablespoons butter, 1/2 large onion, 1 medium carrot, 1/2 celery stalk, 4 garlic cloves, 2 tablespoons tomato paste, 5 tablespoons AP flour, 5 cups chicken stock,4 cups crushed tomato,3 parsely sprigs,3 thyme sprigs,2 bay leaves,2 teaspoons salt,1 teaspoon pepper",
    },
  ];

  try {
    for (const recipeData of recipes) {
      const recipe = new RecipeModel(recipeData);
      await recipe.save();
    }

    console.log("Fake data seeded successfully!");
  } catch (err) {
    console.error("Error seeding fake data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
