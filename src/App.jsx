import { useEffect, useState } from "react";
import { TodoItem } from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load data from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  const isValidInput = (input) => {
    const regex = /^[a-zA-Z0-9.,!? ]*$/;

    if (!regex.test(input)) return false;

    const dotCount = (input.match(/\./g) || []).length;
    if (dotCount > 1 || input.startsWith(".")) return false;

    const questionMarkCount = (input.match(/\?/g) || []).length;
    if (
      questionMarkCount > 1 ||
      (questionMarkCount === 1 && !input.endsWith("?")) ||
      input.startsWith("?")
    ) {
      return false;
    }
    return true;
  };

  const addTodo = () => {
    if (newTodo.trim() === "") {
      setErrorMessage("Tolong masukan data dengan benar");
      return;
    }

    if (!isValidInput(newTodo)) {
      setErrorMessage("Hanya bisa isi huruf, angka,tanda baca lainnya");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: newTodo,
      date: new Date().toLocaleString(),
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
    setErrorMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    if (updatedTodos.length === 0) {
      localStorage.removeItem("todos");
    } else {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: updatedTodo, date: new Date().toLocaleString() }
          : todo
      )
    );
    setUpdatedTodo(""); //Reset updateTodo after update
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container mx-auto px-4 lg:max-w-7xl flex items-center justify-center min-h-screen">
      <div className="max-w-3xl">
        <div className="text-center text-sm text-primary bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center text-sm text-primary grid gap-5">
            <h1 className="font-bold text-3xl">To-Do List</h1>
            <div className="relative">
              <input
                type="text"
                className="border text-gray-700 py-2 px-4 w-[36rem] rounded-full pr-20 focus:outline-primary"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task"
              />
              <button
                onClick={addTodo}
                className="absolute right-1 top-1 bottom-1 bg-primary font-semibold text-white text-xs px-3 rounded-full hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                Add Task
              </button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <ul className="grid gap-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  updatedTodo={updatedTodo}
                  setUpdatedTodo={setUpdatedTodo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                  toggleComplete={toggleComplete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
