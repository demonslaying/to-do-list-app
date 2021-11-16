import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'
import { RiCloseCircleLine } from 'react-icons/ri'
import api from "../services/api"

function Todo({ onClick, todos }) {
    const [todo, setTodo] = useState({
        task_id: null,
        state: 'INCOMPLETE',
        description: ''
    });

    const deleteTodo = task_id => {
        console.log(task_id);
        api.delete(`todo/${task_id}`).then((response) => {
            onClick();
        });
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        //setTodos(updatedTodos);
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div>
                <input type="checkbox" />
            </div>
            <div className='description' key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.description}
            </div>
            <div className="icons">
                <TiEdit />
                <RiCloseCircleLine className='delete-icon' key={todo.task_id} onClick={() => deleteTodo(todo.task_id)} />
            </div>
        </div >
    ))
}

export default Todo
