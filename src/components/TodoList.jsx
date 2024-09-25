import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todos,
  editing,
  toggleComplete,
  startEditTodo,
  deleteTodo,
  updatedTodo,
  setUpdatedTodo,
  updateTodo,
}) => {
  return (
    <ul className="grid gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editing={editing}
          toggleComplete={toggleComplete}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
          updatedTodo={updatedTodo}
          setUpdatedTodo={setUpdatedTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};
