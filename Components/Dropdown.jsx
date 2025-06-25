import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropdownTextBoxForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [textBoxValue, setTextBoxValue] = useState('');
  const [status, setStatus] = useState(null);

  // Fetch dropdown categories
  useEffect(() => {
    axios
      .get('https://ai.rosmerta.dev/train/dropdowns')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('GET error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    const lines = textBoxValue
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const data = lines.map((line) => ({
      message_text: line,
      classification_value: selectedOption,
    }));

    try {
      await axios.post('https://ai.rosmerta.dev/train/messages', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus('✅ Submitted successfully!');
      setSelectedOption('');
      setTextBoxValue('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Submission failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">-- Choose an Option --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.value}>
                  {cat.value}
                </option>
              ))}
            </select>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Details
            </label>
            <textarea
              value={textBoxValue}
              onChange={(e) => setTextBoxValue(e.target.value)}
              rows="6"
              placeholder="Enter your feedback, one line per message..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href="https://ai.rosmerta.dev/train/data/download/"
              download
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white text-center font-semibold rounded-xl shadow-md transition duration-300"
            >
              Download
            </a>

            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
            >
              Submit
            </button>
          </div>

          {/* Status Message */}
          {status && (
            <p
              className={`mt-6 text-center text-sm font-medium ${
                status.includes('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DropdownTextBoxForm;
