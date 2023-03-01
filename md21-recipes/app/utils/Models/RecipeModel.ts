import mongoose from "mongoose";
const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  ingredients: String,
});

// OUR Recipe MODEL
const Recipe =
  mongoose.models.Recipe || mongoose.model("recipe", RecipeSchema);


export default Recipe;