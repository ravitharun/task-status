const express = require('express');
const router = express.Router();
const TaskModel = require('../models/Task');

// POST: Add new task
router.post('/TaskAll/api', async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    // Emit event to all clients
    const io = req.app.get("io");
    io.emit("taskUpdated", { message: "New task added", data: newTask });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: All tasks
router.get('/TaskAll/api', async (req, res) => {
  try {
    const response = await TaskModel.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
