import mongoose from "mongoose";
import AnimalModel from "./models/AnimalSchema";

const MONGO_URI = "mongodb://localhost:27017/animals-db";

async function seedData() {
  await mongoose.connect(MONGO_URI);

  mongoose.set("strictQuery", false);

  // Seed some fake data
  const animals = [
    { name: "Surikat", aclass: "mammal"},
    { name: "Stark", aclass: "bird" },
    { name: "Snake", aclass: "reptile" },
    { name: "Shark", aclass: "fish" },
  ];

  try {
    for (const animalData of animals) {
      const animal = new AnimalModel(animalData);
      await animal.save();
    }

    console.log("Fake data seeded successfully!");
  } catch (err) {
    console.error("Error seeding fake data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
