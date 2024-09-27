import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi";
import { DeleteModal } from "./DeleteModal";
import { UpdateModal } from "./UpdateModal";

export const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleDelete = () => {
    setIsDeleteModalOpen(true); // buka modal delete
  };

  const handleConfirmDelete = () => {
    deleteTodo(todo.id); // proses delete ini akan dilakukan saat tombol di klik
    setIsDeleteModalOpen(false); // tutup modal delete
  };

  const handleUpdate = () => {
    setIsUpdateModalOpen(true); // tutup modal update
  };

  const handleConfirmUpdate = (newText) => {
    updateTodo(todo.id, newText); // proses update ini akan dilakukan saat tombol di klik
    setIsUpdateModalOpen(false); // tutup modal update
  };
  return (
    <li className="flex items-center justify-between rounded-full border border-primary px-4 py-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="form-checkbox h-4 w-4 text-primary bg-white checked:bg-primary border-primary focus:ring-primary"
        />
        <span className={todo.completed ? "line-through" : ""}>
          {todo.text}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleUpdate}
          className="bg-primary text-white p-1 w-8 h-8 rounded-full hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
          <HiPencil className="w-4 h-4 ml-1" />
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-1 w-8 h-8 rounded-full hover:border-red-500 hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
          <FaRegTrashCan className="w-4 h-4 ml-1" />
        </button>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        currentText={updatedText}
      />
    </li>
  );
};
