import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskListPage } from './pages/TaskListPage';
import { TaskFormPage } from './pages/TaskFormPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/tasks/new" element={<TaskFormPage />} />
        <Route path="/tasks/edit/:id" element={<TaskFormPage />} />
        <Route path="/" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;