import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';
import { Trash2, Search } from 'lucide-react';
import { TaskDetail } from './TaskDetail';

export function TaskList() {
  const [searchRef, setSearchRef] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const tasks = useTaskStore(state => state.tasks);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const user = useAuthStore(state => state.user);

  const filteredTasks = tasks.filter(task => 
    task.reference.toLowerCase().includes(searchRef.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por referencia..."
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Actualización
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr 
                key={task.reference}
                onClick={() => setSelectedTask(task.reference)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {task.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.status === 'workshop' && 'Taller'}
                  {task.status === 'quote' && 'Presupuesto'}
                  {task.status === 'pending_parts' && 'Pendiente de repuesto'}
                  {task.status === 'done' && 'Hecho'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(task.updatedAt), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user?.role === 'admin' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.reference);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTask && (
        <TaskDetail
          reference={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}