import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Usuario autenticado');
      navigate('/'); // Redirigir a la página principal después del inicio de sesión exitoso
    } catch (error) {
      if (error === 'auth/user-not-found') {
        setError('Usuario no encontrado.');
      } else if (error === 'auth/wrong-password') {
        setError('Contraseña incorrecta.');
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-600">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
        <p>¿No tienes cuenta? <button type="button" className='text-blue-600 p-3' onClick={() => navigate('/register')}>Regístrate</button></p>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}