import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask } from '../api/tasks';
import { TaskItem } from '../components/TaskItem';

export const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <Link to="/tasks/new" className="btn btn-primary">
        Crear Nueva Tarea
      </Link>
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};