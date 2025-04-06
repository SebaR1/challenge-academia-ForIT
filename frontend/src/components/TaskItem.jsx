import React from 'react';
import { Link } from 'react-router-dom';


export const TaskItem = ({ task, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>
        {task.completed ? '✅ Completada' : '🟡 Pendiente'} | 
        Creada: {new Date(task.createdAt).toLocaleDateString()}
      </small>
      <div className="task-actions">
        <Link to={`/tasks/edit/${task.id}`} className="btn btn-link">Editar</Link>
        <button 
          onClick={() => onDelete(task.id)} 
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};