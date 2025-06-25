import React, { useState } from 'react';
import axios from 'axios';
import DropdownTextBoxForm from './Dropdown';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ai.rosmerta.dev/train/login', {
        username,
        password,
      });

      const { access_token } = res.data;
      console.log("✅ Access Token:", access_token);

      setStatus("✅ Login successful");
      setShowForm(true);
    } catch (err) {
      console.error(err);
      setStatus("❌ Login failed. Please check your credentials.");
    }
  };

  if (showForm) {
    return <DropdownTextBoxForm />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-lg p-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials below
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 transition duration-300 px-4 py-2 text-white font-semibold text-base shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>

          {status && (
            <p
              className={`text-center text-sm font-medium ${
                status.includes('✅') ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
