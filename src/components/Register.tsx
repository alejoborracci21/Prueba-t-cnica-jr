import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../firebase/firebaseServices';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      alert('Usuario registrado');
      navigate('/');
    } catch (error) {
      if (error === 'auth/email-already-in-use') {
        setError('El correo ya está en uso.');
      } else {
        setError('Error al registrarse. Verifica tus credenciales.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-600">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p>¿Ya tienes cuenta? <button type="button" className='text-blue-600 p-3' onClick={() => navigate('/')}>Inicia sesión</button></p>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
}