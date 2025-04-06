import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask, createTask} from '../api/tasks';
import { TaskForm } from '../components/TaskForm';

export const TaskFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTask() {
      if (id) {
        const res = await getTaskById(id);
        setTask(res);
      }
    }
    fetchTask();
  }, [id]);

  const handleSubmit = async (formData) => {
    if (isSubmitting) return;
  
    setIsSubmitting(true);
    try {
      if (id) {
        await updateTask(id, formData);
        navigate('/tasks', { state: { success: "Tarea actualizada correctamente" } });
      } else {
        await createTask(formData);
        navigate('/tasks', { state: { success: "Tarea creada correctamente" } });
      }
    } catch (error) {
      console.error("Error guardando tarea:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (!id) {
    return (
      <div className="container">
        <h1>Crear Nueva Tarea</h1>
        <TaskForm onSubmit={handleSubmit} />
      </div>
    );
  }

  if (!task) {
    return <div className="loading">Cargando tarea...</div>;
  }

  return (
    <div className="container">
      <h1>Editar Tarea</h1>
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
