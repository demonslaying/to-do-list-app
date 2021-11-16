import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'
import { RiCloseCircleLine } from 'react-icons/ri'

function Todo({ todos }) {
    const [edit, setEdit] = useState({
        id: null,
        description: ''
    });

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
                <RiCloseCircleLine />
            </div>
        </div >
    ))
}

export default Todo
