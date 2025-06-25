

import React from 'react';

const Download = () => {
  const fileUrl = `${process.env.PUBLIC_URL}/sample.xlsx`;

  return (
    <div className="p-4">
      <a
        href={`${process.env.PUBLIC_URL}/sample.xlsx`}
        download="sample.xlsx"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition"
      >
        📥 Download Excel File
      </a>
    </div>
  );
};

export default Download;
