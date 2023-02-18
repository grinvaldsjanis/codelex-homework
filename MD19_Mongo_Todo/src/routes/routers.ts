import express, { Request, Response } from 'express';
import Task from '../models/TaskSchema';

const router = express.Router();

// Fetching all tasks

router.get("/tasks", async (req:Request, res:Response) => {
	const posts = await Task.find()
	res.send(posts)
})


// router.post("/tasks", async (req:Request, res:Response) => {
// 	const task = new Task({
// 		title: req.body.title,
// 		done: req.body.done,
//     priority: req.body.priority,
// 	});
// 	await post.save();
// 	res.send(post);
// })






// router.get('/tasks', async (req: Request, res: Response) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching tasks');
//   }
// });

// Create a new task
router.post('/tasks', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const newTask = new Task({
    title,
    description,
  });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating task');
  }
});

// Update a task
router.put('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, done } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        $set: { title, description, done, updatedAt: new Date() },
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating task');
  }
});

// Delete a task
router.delete('tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    res.json(deletedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting task');
  }
});

export default router
