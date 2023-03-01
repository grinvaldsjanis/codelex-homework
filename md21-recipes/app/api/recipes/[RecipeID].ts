import dbConnect from '@/app/services/db';
import { NextApiRequest, NextApiResponse } from 'next';
import Recipe from '../../utils/Models/RecipeModel';

dbConnect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const {
    query: { RecipeID },
    method,
    body,
  } = req;

  if (!RecipeID) {
    res.status(400).json({ error: 'Missing recipe ID' });
    return;
  }

  if (method === 'GET') {
    try {
      const recipe = await Recipe.findById(RecipeID);
      if (!recipe) {
        res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.status(200).json(recipe);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
    
  } else if (method === 'PUT') {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        RecipeID,
        body,
        { new: true }
      );
      if (!updatedRecipe) {
        res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.status(200).json(updatedRecipe);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }

  } else if (method === 'DELETE') {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(RecipeID);
      if (!deletedRecipe) {
        res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.status(200).json(deletedRecipe);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: `Method ${method} not allowed` });
  }
};

export default handler;
