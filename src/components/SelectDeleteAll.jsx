import { useEffect, useState } from "react";

export const SelectDeleteAll = ({ todos, setTodos }) => {
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // toggle showDeleteAll tampil jika semua data di pilih
    const allCompleted =
      todos.length > 0 && todos.every((todo) => todo.completed);
    setSelectAll(allCompleted);
  }, [todos]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: newSelectAll, // set semua data yang di pilih atau tidak
    }));
    setTodos(updatedTodos);
  };

  const handleDeleteAll = () => {
    if (window.confirm("Anda yakin untuk menghapus semua data?")) {
      setTodos([]); // Hapus semua todos
      setSelectAll(false); // Reset select all state
      localStorage.removeItem("todos");
    }
  };
  return (
    <div className="flex justify-between gap-2">
      <button
        onClick={handleSelectAll}
        className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
        {selectAll ? "Deselect All" : "Select All"}
      </button>
      {selectAll && todos.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
          Delete All
        </button>
      )}
    </div>
  );
};
