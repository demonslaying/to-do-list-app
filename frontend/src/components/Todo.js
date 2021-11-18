import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'
import { RiCloseCircleLine } from 'react-icons/ri'
import api from "../services/api"

function Todo({ onClick, todos, completeTodo }) {
    const [edit, setEdit] = useState({
        task_id: null,
        state: 'INCOMPLETE',
        description: ''
    });

    const updateTodo = (task_id, newDescription) => {
        if (!newDescription.text || /^\s*$/.test(newDescription.text)) {
            return;
        }

        api.patch(`todo/${task_id}`, {
            description: newDescription
        }).then((response) => {
            //onSubmit();
        });
        //setTodos(prev => prev.map(item => (item.id === task_id ? newDescription : item)));
    }

    const submitUpdate = description => {
        updateTodo(edit.task_id, description);
        setEdit({
            task_id: edit.task_id,
            state: 'INCOMPLETE',
            description: ''
        });
    }

    if (edit.task_id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    const deleteTodo = task_id => {
        api.delete(`todo/${task_id}`).then((response) => {
            onClick();
        });
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div className='description' key={todo.task_id} onClick={() => completeTodo(todo.task_id)}>
                {todo.description}
            </div>
            <div className="icons">
                <TiEdit className='edit-icon' onClick={() => setEdit({
                    task_id: todo.task_id,
                    state: todo.state,
                    description: todo.description
                })} />
                <RiCloseCircleLine className='delete-icon' onClick={() => deleteTodo(todo.task_id)} />
            </div>
        </div >
    ));
}

export default Todo
