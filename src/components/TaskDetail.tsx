import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { format } from 'date-fns';
import { Clock, FileText } from 'lucide-react';

interface TaskDetailProps {
  reference: string;
  onClose: () => void;
}

export function TaskDetail({ reference, onClose }: TaskDetailProps) {
  const task = useTaskStore(state => state.tasks.find(t => t.reference === reference));
  const logs = useTaskStore(state => 
    state.logs.filter(log => log.taskReference === reference)
  );
  const updateTaskStatus = useTaskStore(state => state.updateTaskStatus);

  if (!task) return null;

  const statusOptions = [
    { value: 'workshop', label: 'Taller' },
    { value: 'quote', label: 'Presupuesto' },
    { value: 'pending_parts', label: 'Pendiente de repuesto' },
    { value: 'done', label: 'Hecho' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Referencia: {reference}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            value={task.status}
            onChange={(e) => updateTaskStatus(reference, e.target.value as any)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 flex items-center mb-2">
            <Clock className="h-4 w-4 mr-2" />
            Historial
          </h4>
          <div className="max-h-60 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="mb-2 p-2 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  {format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="text-sm">{log.details}</p>
                <p className="text-sm text-gray-500">{log.userName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}