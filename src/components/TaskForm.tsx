import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { Plus } from 'lucide-react';

export function TaskForm() {
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState<'workshop' | 'quote' | 'pending_parts' | 'done'>('workshop');
  const addTask = useTaskStore(state => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(reference, status);
    setReference('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
          Reference Number
        </label>
        <input
          type="text"
          id="reference"
          required
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="workshop">Taller</option>
          <option value="quote">Presupuesto</option>
          <option value="pending_parts">Pendiente de repuesto</option>
          <option value="done">Hecho</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Task
      </button>
    </form>
  );
}