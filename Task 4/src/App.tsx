import { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const saveTodos = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = { text: inputValue, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setInputValue("");
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingValue(todos[index].text);
  };

  const saveEditing = () => {
    if (editingValue.trim() === "") return;
    const updatedTodos = todos.map((todo, i) =>
      i === editingIndex ? { ...todo, text: editingValue } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setEditingIndex(null);
    setEditingValue("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <h1 className="title">Todo App</h1>

      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What do you want to do today?"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? "todo completed" : "todo"}
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="edit-input"
                  title="Edit todo"
                  placeholder="Edit todo"
                />
                <button onClick={saveEditing} className="btn save">
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="actions">
                  <button onClick={() => toggleTodo(index)}>
                    {todo.completed ? "Undo" : "Done"}
                  </button>
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
