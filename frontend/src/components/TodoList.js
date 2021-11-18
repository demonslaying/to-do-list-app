import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import api from "../services/api"

function TodoList() {
    let [todos, setTodos] = useState([])

    const getTodos = () => {
        api.get("todos").then((response) => {
            todos = response.data;
            setTodos(todos);
        });
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div>
            <TodoForm onSubmit={getTodos} />
            <Todo todos={todos} getTodos={getTodos} />
        </div>
    );
}

export default TodoList
