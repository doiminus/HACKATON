import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userSlice';

const LoginForm = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const backendError = useSelector((state) => state.user.error);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      } else {
        setError('Pogrešan email ili lozinka');
      }
    } catch (err) {
      setError('Greška pri logiranju');
    }
  };

  return (
    <div className="flex items-top justify-center ">
      <div className="bg-gradient-to-br from-zagreb-blue to-zagreb-light-blue p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Dobrodošli 👋</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-zagreb-yellow text-black"
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-zagreb-yellow text-black"
          />
          {(error || backendError) && (
            <div className="text-red-500 text-sm">
              {error || backendError}
            </div>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-zagreb-yellow text-white py-2 rounded hover:bg-zagreb-light-blue transition"
          >
            {status === 'loading' ? 'Prijavljivanje...' : 'Log In'}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-white">
          Nemate korisnički račun?{' '}
          <a href="/register" className="text-zagreb-yellow underline">
            Registracija
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
