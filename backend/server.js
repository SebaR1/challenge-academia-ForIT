// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Configura dotenv primero
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos en memoria con la nueva estructura
let tasks = [
  {
    id: '1', // String
    title: 'Aprender Express',
    description: 'Crear un servidor básico con Express', // Nuevo campo
    completed: false,
    createdAt: new Date('2023-10-01') // Nuevo campo
  },
  {
    id: '2',
    title: 'Crear una API REST',
    description: 'Implementar endpoints CRUD', // Nuevo campo
    completed: true,
    createdAt: new Date('2023-10-02') // Nuevo campo
  }
];

// ● GET /api/tasks - Obtener todas las tareas (con nuevos campos)
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// ● POST /api/tasks - Crear tarea con la nueva estructura
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body; // Ahora recibimos description

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'El título es obligatorio y debe ser texto' });
  }

  const newTask = {
    id: Date.now().toString(), // ID como string basado en timestamp
    title,
    description: description || '', // Campo opcional (valor por defecto)
    completed: false,
    createdAt: new Date() // Fecha actual automática
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ● GET /api/tasks/:id - Obtener una sola tarea por ID
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(task);
});


// ● PUT /api/tasks/:id - Actualir con nuevos campos
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body; // Ahora incluye description

  const taskIndex = tasks.findIndex(task => task.id === id); // ID como string

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // Actualiza solo los campos proporcionados
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description, // Nuevo campo
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };

  res.json(tasks[taskIndex]);
});

// ● DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id); // Comparación como string
  res.status(204).end();
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});