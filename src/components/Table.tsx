import React, { useState, useEffect } from 'react';
import addtask from '../hooks/addtask';
import deleteCollection from '../hooks/deleteColleccion';
import getTasks from '../hooks/getTask';
import { Task } from '../interfaces/tasks';
import deleteTaskId from '../hooks/deleteTask';

export default function Table() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    getTasks()
      .then((tasks: Task[]) => {
        setAllTasks(tasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [allTasks]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await addtask(taskName);
    setTaskName('');
    setShowForm(false);
  };

  return (
    <div className="flex w-full h-full bg-slate-900">
      <ul className="p-4 rounded-lg text-cyan-50 text-lg w-1/2">
        {allTasks.map((task: Task) => (
          <div key={task.id} className="flex justify-between items-center">
            <span>{task.text}</span>
            <button
              className="bg-red-400 p-2 m-2"
              onClick={() => deleteTaskId(task.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </ul>
      <div className="flex flex-col items-center w-1/2">
        <button
          className="bg-green-600 p-4 w-1/3 m-5 h-14"
          onClick={() => setShowForm(true)}
        >
          Agregar tarea
        </button>
        {showForm && (
          <form onSubmit={handleAddTask} className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nombre de la tarea:</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Agregar
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 ml-2"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </form>
        )}
        <button
          className="bg-red-600 p-4 w-1/3 m-5 h-14"
          onClick={() => deleteCollection('tasks')}
        >
          Borrar todas las tareas
        </button>
      </div>
    </div>
  );
}