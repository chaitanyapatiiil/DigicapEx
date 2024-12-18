import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setMessage('Account created successfully! You can now log in.');
      } else {
        setError(data.message || 'Signup failed.');
        setMessage('');
      }
    } catch (err) {
      setError('Error connecting to server.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
