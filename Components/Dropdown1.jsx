// DropdownTextBoxForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';

const DropdownTextBoxForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [textBoxValue, setTextBoxValue] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false); // Track logout state

  useEffect(() => {
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('GET error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      category: selectedOption,
      content: textBoxValue,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/submit', data, {
        withCredentials: true
      });
      setStatus(res.data.message);
      setSelectedOption('');
      setTextBoxValue('');
    } catch (err) {
      console.error(err);
      setStatus("❌ Submission failed.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, {
        withCredentials: true
      });
      setIsLoggedOut(true); // trigger login screen
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // If user logs out, show the login component again
  if (isLoggedOut) {
    return <Login />;
  }

  // If not authenticated
  if (user === null) {
    return <div className="text-center text-red-500 mt-10">⚠ Please login first.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-stone-700">Submit Your Feedback</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Select Category
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full p-3 border text-gray-700 bg-blue-50 rounded-lg focus:outline-none"
              required
            >
              <option value="">-- Choose an Option --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Details
            </label>
            <textarea
              value={textBoxValue}
              onChange={(e) => setTextBoxValue(e.target.value)}
              className="w-full p-3 border text-gray-700 bg-blue-50 rounded-lg focus:outline-none"
              rows="5"
              placeholder="Enter details clearly..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Submit
          </button>

          {status && (
            <p className={`mt-5 text-center font-medium ${status.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DropdownTextBoxForm;
