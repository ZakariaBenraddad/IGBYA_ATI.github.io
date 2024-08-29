import { useState, useEffect } from "react";
import axios from "axios";
import "./TodoList.css";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get("/api/todos");
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/todos", { title: newTodo });
            setNewTodo("");
            fetchTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const startEdit = (todo) => {
        setEditingId(todo._id);
        setEditText(todo.title);
    };

    const saveEdit = async (id) => {
        try {
            await axios.put(`/api/todos/${id}`, { title: editText });
            setEditingId(null);
            fetchTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const toggleComplete = async (todo) => {
        try {
            await axios.put(`/api/todos/${todo._id}`, {
                completed: !todo.completed,
            });
            fetchTodos();
        } catch (error) {
            console.error("Error toggling todo completion:", error);
        }
    };

    return (
        <div className="todo-container">
            <h2 className="todo-title">Todo List</h2>
            <form onSubmit={addTodo}>
                <input
                    className="todo-input"
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo._id}
                        className={todo.completed ? "completed" : ""}
                    >
                        <div className="todo-content">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo)}
                            />
                            {editingId === todo._id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) =>
                                        setEditText(e.target.value)
                                    }
                                    onBlur={() => saveEdit(todo._id)} // Add this line
                                />
                            ) : (
                                <span>{todo.title}</span>
                            )}
                        </div>
                        <div className="todo-actions">
                            {editingId === todo._id ? (
                                <button onClick={() => saveEdit(todo._id)}>
                                    Save
                                </button>
                            ) : (
                                <button onClick={() => startEdit(todo)}>
                                    Edit
                                </button>
                            )}
                            <button onClick={() => deleteTodo(todo._id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
