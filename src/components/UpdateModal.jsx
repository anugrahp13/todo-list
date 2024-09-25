import React from "react";

export const UpdateModal = ({
  isOpen,
  onClose,
  updatedTodo,
  setUpdatedTodo,
  updateTodo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 grid gap-5">
        <h2 className="text-xl font-bold">Update Task</h2>
        <input
          type="text"
          className="border text-gray-700 py-2 px-4 p-2 w-full rounded-full focus:outline-primary"
          value={updatedTodo}
          onChange={(e) => setUpdatedTodo(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-red-500 hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Cancel
          </button>
          <button
            onClick={() => {
              updateTodo();
              onClose();
            }}
            className="bg-primary text-white px-4 py-2 rounded-full hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
