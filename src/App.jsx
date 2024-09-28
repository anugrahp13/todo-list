import { useEffect, useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { SelectDeleteAll } from "./components/SelectDeleteAll";
import { DarkModeToggle } from "./components/DarkModeToggle";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Load data dari localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          setTodos([]); // Jika datanya bukan array, set ke array kosong
        }
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error);
        setTodos([]); // Jika parsing JSON gagal, set ke array kosong
      }
    } else {
      setTodos([]); // Jika localStorage kosong, set ke array kosong
    }
  }, []);

  // Save data ke localStorage setiap kali 'todos' berubah
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const isValidInput = (input) => {
    const regex = /^[a-zA-Z0-9.,!? ]*$/;

    if (!regex.test(input)) return false;
    if (input.startsWith(".") || input.startsWith("?")) return false;

    const dotCount = (input.match(/\./g) || []).length;
    if (dotCount > 1) return false;

    const questionMarkCount = (input.match(/\?/g) || []).length;
    if (
      questionMarkCount > 1 ||
      (questionMarkCount === 1 && !input.endsWith("?"))
    ) {
      return false;
    }

    return true;
  };

  const addTodo = () => {
    const trimmedTodo = newTodo.trim();

    if (!isValidInput(trimmedTodo) || trimmedTodo === "") {
      alert(
        "Data yang kamu masukkan tidak benar. Tidak boleh dimulai dengan '.' atau '?' atau 'spasi' dan harus berisi karakter yang benar."
      );
      return;
    }

    const newTask = {
      id: Date.now(),
      text: trimmedTodo,
      date: new Date().toLocaleString(),
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setNewTodo(""); // Kosongkan input setelah task ditambahkan
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="container mx-auto px-4 lg:max-w-7xl flex items-center justify-center min-h-screen">
      <div className="max-w-3xl relative">
        <div className="absolute right-3 top-3 dark:text-white">
          <DarkModeToggle />
        </div>
        <div className="text-sm text-primary bg-white p-6 rounded-lg shadow-lg dark:bg-dark">
          <div className="text-center text-sm text-primary grid gap-5">
            <h1 className="font-bold text-3xl dark:text-white">To-Do List</h1>
            <div className="relative">
              <input
                type="text"
                className="border dark:border-slate-700 dark:bg-slate-700 bg-white text-gray-700 dark:text-white py-2 px-4 lg:w-[36rem] w-full rounded-full pr-20 focus:outline-primary dark:focus:outline-white"
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
            <SelectDeleteAll todos={todos} setTodos={setTodos} />
            <ul className="grid gap-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
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
