import mongoose from "mongoose";
import TaskModel, { TaskInterface } from "./models/TaskSchema";

const MONGO_URI = "mongodb://localhost:27017/todo-db";

async function seedData() {
  await mongoose.connect(MONGO_URI);

  mongoose.set("strictQuery", false);

  // Seed some fake data
  const tasks = [
    { title: "Task 1", priority: "high", done: false },
    { title: "Task 2", priority: "moderate", done: true },
    { title: "Task 3", priority: "low", done: false },
  ];

  try {
    for (const taskData of tasks) {
      const task = new TaskModel(taskData);
      await task.save();
    }

    console.log("Fake data seeded successfully!");
  } catch (err) {
    console.error("Error seeding fake data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
