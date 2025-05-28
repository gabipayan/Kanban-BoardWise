import { useState, useEffect } from 'react';
import { getAuthHeader } from '../api/authAPI';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks', {
        headers: getAuthHeader(),
      });
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: Task['status']) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: getAuthHeader() }
      );
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const columns = {
    todo: tasks.filter((task) => task.status === 'todo'),
    'in-progress': tasks.filter((task) => task.status === 'in-progress'),
    done: tasks.filter((task) => task.status === 'done'),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kanban Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 capitalize">{status}</h2>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded shadow"
                  draggable
                  onDragEnd={(e) => {
                    const newStatus = e.currentTarget.getAttribute('data-status') as Task['status'];
                    updateTaskStatus(task.id, newStatus);
                  }}
                >
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard; 