import express from 'express';

const app = express();
app.use(express.json());

// Andmestik
let tasks = [
  { id: 1, title: "Learn JSX", completed: true },
  { id: 2, title: "Practise React state", completed: false },
  { id: 3, title: "Build a Node.js API", completed: false }
];

// Tervisekontroll
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// GET: Kõik ülesanded / filtreerimine
app.get('/api/tasks', (req, res) => {
  const { completed } = req.query;

  if (completed !== undefined) {
    if (completed !== 'true' && completed !== 'false') {
      return res.status(400).json({ error: "Invalid completed query value" });
    }
    const isCompleted = completed === 'true';
    return res.json(tasks.filter(t => t.completed === isCompleted));
  }

  res.json(tasks);
});

// GET: Üksik ülesanne ID järgi
app.get('/api/tasks/:id', (req, res, next) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }
  res.json(task);
});

// POST: Uue ülesande loomine
app.post('/api/tasks', (req, res, next) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    const err = new Error("Title is required and must be a non-empty string");
    err.status = 400;
    return next(err);
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH: Ülesande osaline uuendamine (tiitel ja/või completed)
app.patch('/api/tasks/:id', (req, res, next) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      const err = new Error("Invalid title");
      err.status = 400;
      return next(err);
    }
    task.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      const err = new Error("Completed must be a boolean");
      err.status = 400;
      return next(err);
    }
    task.completed = completed;
  }

  res.json(task);
});

// DELETE: Ülesande kustutamine
app.delete('/api/tasks/:id', (req, res, next) => {
  const taskIndex = tasks.findIndex(t => t.id === Number(req.params.id));
  if (taskIndex === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// 404 middleware tundmatute marsruutide jaoks
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Üldine vigade haldamise middleware (Error-handling middleware)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

export default app;