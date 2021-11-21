import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import api from "../services/api"
import TodoList from './TodoList';

function TodoApp() {
    let [todos, setTodos] = useState([])

    const [edit, setEdit] = useState({
        task_id: null,
        state: null,
        description: null,
    });

    const getTodos = () => {
        api.get("todos").then((response) => {
            console.log(response.data)
            setTodos(response.data);
        });
    }

    useEffect(() => {
        getTodos();
    }, []);

    const updateTodoDescription = (task_id, newDescription) => {
        //TODO: INVOCAR FUNÇÃO DE UTILIDADE
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

    const updateEditTodo = (task_id, description) => {
        setEdit({
            task_id: task_id,
            description: description
        })
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

    return (
        <div>
            <TodoForm onSubmit={getTodos} />
            {edit.task_id ? (
                <TodoForm edit={edit} onSubmit={updateTodoDescription} />
            ) : (
                <TodoList todos={todos} updateEditTodo={updateEditTodo}
                    updateTodoState={updateTodoState} deleteTodo={deleteTodo} />
            )}
        </div>
    );
}

export default TodoApp