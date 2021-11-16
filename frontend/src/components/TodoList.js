import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import api from "../services/api"

function TodoList() {
    let [todos, setTodos] = useState([])

    //TODO: FAZER FUNCAO GETtodos, depois de fazer o get atualizar os todos com o setTodos
    const getTodos = () => {
        api.get("todos").then((response) => {
            todos = response.data;
            //console.log(todos);
            setTodos(todos);
        });
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div>
            <TodoForm onSubmit={getTodos} />
            <Todo todos={todos} onClick={getTodos} />
        </div>
    )
}

export default TodoList
