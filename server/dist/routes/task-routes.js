"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_js_1 = require("../db/index.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Get all tasks
router.get('/', auth_js_1.authenticateToken, async (_req, res) => {
    try {
        const tasks = await index_js_1.db.any('SELECT * FROM tasks ORDER BY id');
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});
// Update task status
router.patch('/:id', auth_js_1.authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await index_js_1.db.none('UPDATE tasks SET status = $1 WHERE id = $2', [status, id]);
        res.json({ message: 'Task updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});
// Create new task
router.post('/', auth_js_1.authenticateToken, async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await index_js_1.db.one('INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *', [title, description, status]);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
});
exports.default = router;
