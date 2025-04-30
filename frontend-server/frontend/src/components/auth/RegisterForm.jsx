import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/userSlice';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setFormError('Lozinke se ne podudaraju');
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      is_realtor: 'false',
      qr: 'false',
    };

    const action = await dispatch(createUser(userData));

    if (createUser.fulfilled.match(action)) {
      navigate('/'); 
    }
  };

  return (
    <div className="flex items-top justify-center">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-zagreb-blue">Kreiraj račun 📝</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Ime"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Prezime"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Potvrda lozinke"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {(formError || error) && (
            <div className="text-red-500 text-sm">
              {formError || error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-zagreb-blue text-white py-2 rounded hover:bg-blue-800 transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Registriram...' : 'Registriraj se'}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Već imate račun?{' '}
          <a href="/login" className="text-blue-700 underline">
            Log in ovdje
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
