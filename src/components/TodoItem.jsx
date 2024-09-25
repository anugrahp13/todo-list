import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi";
import { UpdateModal } from "./UpdateModal";

export const TodoItem = ({
  todo,
  toggleComplete,
  deleteTodo,
  updatedTodo,
  setUpdatedTodo,
  updateTodo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <li className="flex items-center justify-between rounded-full border border-primary px-4 py-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="form-checkbox h-4 w-4 text-primary bg-white checked:bg-primary border-primary focus:ring-primary"
        />
        <div
          className={`flex ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}>
          <span className="text-gray-800 text-sm">{todo.text}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white p-1 w-8 h-8 rounded-full hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
          <HiPencil className="w-4 h-4 ml-1" />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 text-white p-1 w-8 h-8 rounded-full hover:border-red-500 hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
          <FaRegTrashCan className="w-4 h-4 ml-1" />
        </button>
      </div>

      <UpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updatedTodo={updatedTodo}
        setUpdatedTodo={setUpdatedTodo}
        updateTodo={updateTodo}
      />
    </li>
  );
};
