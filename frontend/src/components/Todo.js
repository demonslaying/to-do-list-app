import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'
import { RiCloseCircleLine } from 'react-icons/ri'
import ScrollContainer from 'react-indiana-drag-scroll'
import api from "../services/api"

function Todo({ getTodos, todos }) {
    const [edit, setEdit] = useState({
        task_id: null,
        state: null,
        description: null,
    });

    const [showAll, setShowAll] = useState(
        true
    );

    const updateTodoDescription = (task_id, newDescription) => {
        if (!newDescription || /^\s*$/.test(newDescription)) {
            return;
        }

        api.patch(`todo/${task_id}`, {
            description: newDescription
        }).then((_) => {
            setEdit({
                task_id: null
            });
            getTodos();
        });
    }

    if (edit.task_id) {
        return <TodoForm edit={edit} onSubmit={updateTodoDescription} />;
    }

    const updateTodoState = (task_id, state) => {
        api.patch(`todo/${task_id}`, {
            state: state === 'COMPLETE' ? 'INCOMPLETE' : 'COMPLETE'
        }).then((_) => {
            setEdit({
                state: state === 'COMPLETE' ? 'INCOMPLETE' : 'COMPLETE'
            });
            getTodos();
        });
    }

    const deleteTodo = task_id => {
        api.delete(`todo/${task_id}`).then((_) => {
            getTodos();
        });
    }

    return <div>
        <ScrollContainer className="scroll-container" horizontal="false">
            {
                todos.filter(todo => todo.state === 'INCOMPLETE' || showAll).map((todo, index) => (
                    <div className={todo.state === 'COMPLETE' ? 'todo-row complete' : 'todo-row'} key={index}>
                        <div className='description' key={todo.task_id} onClick={() => updateTodoState(todo.task_id, todo.state)}>
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
                ))
            }
        </ScrollContainer>
        <h1 className="left hideComplete" onClick={() => setShowAll(!showAll)}> Hide completed </h1>
    </div>
}

export default Todo
