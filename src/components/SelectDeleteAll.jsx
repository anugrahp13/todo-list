import { useEffect, useState } from "react";
import { DeleteModal } from "./DeleteModal";

export const SelectDeleteAll = ({ todos, setTodos }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hasSelectedItems, setHasSelectedItems] = useState(false);

  useEffect(() => {
    const selected = todos.some((todo) => todo.completed);
    setHasSelectedItems(selected);
  }, [todos]);
  const handleSelectAll = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !selectAll, // set semua data yang di pilih atau tidak
    }));
    setSelectAll(!selectAll);
    setTodos(updatedTodos);
  };

  const handleDeleteAllClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAll = () => {
    setTodos([]); // Hapus semua todos
    setSelectAll(false); // Reset select all state
    setIsDeleteModalOpen(false); // tutup modal
    localStorage.removeItem("todos");
  };

  if (todos.length === 0) return null;
  return (
    <div className="flex justify-between gap-2">
      {todos.length > 0 && (
        <>
          <button
            onClick={handleSelectAll}
            className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            {selectAll ? "Deselect All" : "Select All"}
          </button>
          {hasSelectedItems && (
            <button
              onClick={handleDeleteAllClick}
              className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
              Delete All
            </button>
          )}
        </>
      )}

      {/* Modal Popup */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteAll}
        title="Delete Data"
        message="Apakkah kamu yakin ingin menghapus data ini?"
      />
    </div>
  );
};
