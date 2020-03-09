import React, {useState, useEffect} from 'react';
import './App.css';

export default function App() {

  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');

  useEffect( ()=> {
      getListTodo()
  }, [])

  const addTodo  = (event) => {
      setTodo(event.target.value)
  }

  const getListTodo  = async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_TODO_API_HOST}/todos`)
          const body = await response.json()
          setTodoList(body)
      } catch (e) {
          console.log(e)
      }
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
           const response = await fetch(`${process.env.REACT_APP_TODO_API_HOST}/todos`, {
              method: 'POST',
               mode: 'no-cors',
               body: JSON.stringify({"text": todo})
               ,
              headers: {
                  'Content-Type': 'application/json',
              }
          })
          getListTodo()
      } catch (e) {
       console.error(e)
      }
  }

  const deleteTodo = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch(`${process.env.REACT_APP_TODO_API_HOST}/todos/${event.target.id}`, {
              method: 'DELETE',
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json',
              }
          })
          getListTodo()
      } catch (e) {
          console.error(e)
      }
  }

  const checkTodo = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch(`${process.env.REACT_APP_TODO_API_HOST}/todos/${event.target.id}`, {
              method: 'PUT',
              mode: 'cors',
              body: JSON.stringify({"checked": true}),
              headers: {
                  'Content-Type': 'application/json',
              }
          })
          getListTodo()
      } catch (e) {
          console.error(e)
      }
  }

  return (
    <div className="App">

        <form onSubmit={handleSubmit}>
            <input type="text" onChange={addTodo}/>
            <button type="submit" >Add</button>
        </form>

      <ul>
          {todoList && todoList.map(value => (
             <li className={value.checked && 'Todo-checked'}  id={value.id} key={value.id}>
                 <span onDoubleClick={checkTodo}>{value.text}</span>
                 <span>{new Date(value.createdAt).toLocaleDateString("fr-FR")}</span>
                 <button id={value.id} onClick={deleteTodo}>Delete</button>
             </li>
          ))}
      </ul>

    </div>
  );
}
