import { useState, useEffect } from 'react';

export const TaskForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        completed: initialData.completed || false
      });
    }
  }, [initialData]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ¡Esto es crucial!
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título de la tarea"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción detallada..."
          rows="4"
        />
      </div>

      <div className="form-group checkbox-group">
        <input
          id="completed"
          name="completed"
          type="checkbox"
          checked={formData.completed}
          onChange={handleChange}
        />
        <label htmlFor="completed">Tarea completada</label>
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData?.id ? 'Actualizar Tarea' : 'Crear Tarea'}
      </button>
    </form>
  );
};