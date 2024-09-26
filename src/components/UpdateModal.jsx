import React, { useState } from "react";

export const UpdateModal = ({ isOpen, onClose, onConfirm, currentText }) => {
  const [updatedText, setUpdatedText] = useState(currentText);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg grid gap-5">
        <h2 className="text-xl font-bold">Edit Data</h2>
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className="border px-4 py-2 rounded-full w-72 focus:outline-primary"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-xs hover:border-red-500 hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(updatedText)}
            className="bg-primary text-white px-4 py-2 rounded-full font-semibold text-xs hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
