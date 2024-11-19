import React, { useState } from 'react';

const Login = () => {
  // State variables to manage user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // Simulate successful login (replace with actual authentication logic)
    setError('');
    alert('Logged in successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
