import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import api from "../services/api"

function TodoList() {
    let [todos, setTodos] = useState([])

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

    const completeTodo = task_id => {
        let updatedTodos = todos.map(todo => {
            if (todo.task_id === task_id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        setTodos(updatedTodos);
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    }

    return (
        <div>
            <TodoForm onSubmit={getTodos} />
            <Todo todos={todos} onClick={getTodos} completeTodo={completeTodo} updateTodo={updateTodo} />
        </div>
    );
}

export default TodoList
