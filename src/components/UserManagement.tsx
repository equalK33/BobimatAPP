import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { UserPlus, Trash2, Users } from 'lucide-react';
import { UserRole } from '../types';

export function UserManagement() {
  const [newUserData, setNewUserData] = useState({
    email: '',
    name: '',
    role: 'operator' as UserRole,
  });

  const { users, addUser, deleteUser, user: currentUser } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(newUserData);
    setNewUserData({
      email: '',
      name: '',
      role: 'operator',
    });
  };

  if (currentUser?.role !== 'admin') return null;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Gestión de Usuarios</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Código de Usuario
          </label>
          <input
            type="text"
            id="email"
            required
            value={newUserData.email}
            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            required
            value={newUserData.name}
            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rol
          </label>
          <select
            id="role"
            value={newUserData.role}
            onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as UserRole })}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="operator">Operario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Agregar Usuario
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Usuarios Registrados</h3>
        <ul className="divide-y divide-gray-200">
          {users.map((u) => (
            <li key={u.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-sm text-gray-500">{u.role === 'admin' ? 'Administrador' : 'Operario'}</p>
              </div>
              {u.id !== currentUser.id && (
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}