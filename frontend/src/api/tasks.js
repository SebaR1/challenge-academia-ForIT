// Importo variable de entorno.
const API_URL = import.meta.env.VITE_API_URL;

const handleRequest = async (url, method, body = null) => {
  const config = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) })
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    let error = '';
    try {
      error = await response.json();
    } catch {
      error = { message: 'Error en la solicitud' };
    }
    throw new Error(error.message || 'Error en la solicitud');
  }

  if (response.status === 204) return null;

  return await response.json();
};

// Operaciones CRUD
export const getTasks = () => handleRequest(API_URL, 'GET');
export const getTaskById = (id) => handleRequest(`${API_URL}/${String(id)}`, 'GET');
export const createTask = (task) => handleRequest(API_URL, 'POST', task);
export const updateTask = (id, task) => handleRequest(`${API_URL}/${id}`, 'PUT', task);
export const deleteTask = (id) => handleRequest(`${API_URL}/${id}`, 'DELETE');