import { AnimalInterface } from "./../models/AnimalSchema";
import express, { NextFunction, Request, Response } from "express";
import AnimalModel from "../models/AnimalSchema";
import bodyparser from "body-parser";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const animals: AnimalInterface[] = await AnimalModel.find();
    return res.status(200).json({ animals });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Create a new animal
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Data received by the server for post:", req.body);
    const { name, aclass } = req.body;
    const newAnimal: AnimalInterface = new AnimalModel({
      name,
      aclass,
    });
    const savedAnimal: AnimalInterface = await newAnimal.save();
    return res.status(201).json({ animalId: savedAnimal._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update a animal
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("Data received by the server:", req.body);
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const updatedAnimal: AnimalInterface | null =
      await AnimalModel.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          done: req.body.done,
          priority: req.body.priority,
        },
        { new: true }
      );
    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    return res.status(200).json({ animal: updatedAnimal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE request
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedAnimal: AnimalInterface | null =
      await AnimalModel.findByIdAndDelete(id);
    if (!deletedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    return res.status(200).json({ animal: deletedAnimal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
