import { useState } from "react";
import './App.css'


export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, 
      task: "Next", 
      done: false }]);

 const [newTodo, setNewTodo] = useState ("")

const addTodo = (doIt) => {
  const newTodoList = [...todos, 
    {id:todos.length +1 , 
      task: doIt, 
      done: false}, ];
  setTodos(newTodoList);
};

const deleteTodo = (id) => {
  const newTodoList = todos.filter((item ) => item.id !=id);
  setTodos(newTodoList);
};


const updateTask = (id, task) => {
  const newToDos = toDos.map((todo)=> {
    if (todo.id === id) {
      return {...todo, task}
    } else {
      return item
    }
  })
  setTodos(newToDos)
}


  return (
    <div className="container"> 
      <h1>TO DO LIST</h1>
<form id="toDoInput" className="new-todo-cont" onSubmit={e => e.preventDefault()}>
    <div className="new-todo-container">
    <input type="text" value={newTodo} onChange={ event => setNewTodo(event.target.value)} 
    placeholder="New Item"/>
    <button onClick={() => {
      addTodo(newTodo);
      setNewTodo("")
      }}>➕</button>
    </div>
</form>
      <ul className="todo-list">
       {todos.map((item) => {
          return (
            <li key={item.id} className="todo-list-item">
              <input type="checkbox" value={item.done} />
              <span className="todo-item-text">{item.task}</span>
              <button onClick={() => deleteTodo(item.id)} className="deleteItem">❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
