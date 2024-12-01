import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { UserCircle2, AlertCircle } from 'lucide-react';

export function LoginForm() {
  const [userCode, setUserCode] = useState('');
  const { login, error, clearError } = useAuthStore(state => ({
    login: state.login,
    error: state.error,
    clearError: state.clearError
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(userCode.trim().toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearError();
    setUserCode(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <UserCircle2 className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Gestión de Tareas - Taller
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingrese su código de usuario
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userCode" className="block text-sm font-medium text-gray-700">
              Código de Usuario
            </label>
            <input
              id="userCode"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={userCode}
              onChange={handleInputChange}
              placeholder="Ingrese su código"
            />
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}