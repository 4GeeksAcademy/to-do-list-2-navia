import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export default function App() {
  const [todos, setTodos] = useState([{ id: 1, text: "Next", done: false }]);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (doIt) => {
    if (!doIt) return;
    const todoReference = collection(db, "todos");
    await addDoc(todoReference, {
      text: doIt,
      done: false,
    }).then((docRef) => {
      const newTodoList = [
        ...todos,
        { id: docRef.id, text: doIt, done: false },
      ];
      setTodos(newTodoList);
    });};

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db,"todos",id))
    const newTodoList = todos.filter((item) => item.id != id);
    setTodos(newTodoList);
  };

  const updateTask = (id, text) => {
    const newToDos = toDos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text };
      } else {
        return item;
      }
    });
    setTodos(newToDos);
  };

  const changeTodoState = (id, state) => {
    const newTodoList = todos.map((item) => {
      if (item.id == id) {
        return { ...item, done: state };
      }
      return item;
    });
    setToDos(newTodoList);
  };

  useEffect(() => {
    const todoReference = collection(db, "todos"); //"" depends on your fb collections name

    const getData = async () => {
      const data = await getDocs(todoReference);
      const todos = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todos);
    };
    getData();
  }, []);

  return (
    <div className="container">
      <h1>TO DO LIST</h1>
      <form
        id="toDoInput"
        className="new-todo-cont"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="new-todo-container">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="New Item"
          />
          <button
            onClick={() => {
              addTodo(newTodo);
              setNewTodo("");
            }}
          >
            ➕
          </button>
        </div>
      </form>
      <ul className="todo-list">
        {todos.map((item) => {
          return (
            <li key={item.id} className="todo-list-item">
              <input type="checkbox" value={item.text} />
              <span className="todo-item-text">{item.text}</span>
              <button
                onClick={() => deleteTodo(item.id)}
                className="deleteItem"
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
