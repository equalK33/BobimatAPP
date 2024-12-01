import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';
import { ClipboardList } from 'lucide-react';

export function ActivityLog() {
  const logs = useTaskStore(state => state.logs);
  const user = useAuthStore(state => state.user);
  const updateLogEntry = useTaskStore(state => state.updateLogEntry);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <ClipboardList className="h-5 w-5 mr-2" />
          Activity Log
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {logs.map((log) => (
            <li key={log.id} className="px-4 py-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{log.userName}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                  {user?.role === 'admin' ? (
                    <input
                      type="text"
                      value={log.details}
                      onChange={(e) => updateLogEntry(log.id, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">{log.details}</p>
                  )}
                  {log.taskReference && (
                    <p className="mt-1 text-sm text-gray-500">
                      Reference: {log.taskReference}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}