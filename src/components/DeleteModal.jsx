export const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg grid gap-5">
        <h2 className="text-xl font-bold">Delete Data</h2>
        <p className="text-base">
          Apakkah kamu yakin ingin menghapus data ini?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-semibold text-xs hover:border-gray-300 hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-xs hover:border-red-500 hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
