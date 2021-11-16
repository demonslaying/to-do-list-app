import React, { useState } from 'react'
import api from "../services/api"

function TodoForm(props) {
    const [input, setInput] = useState('')

    const putData = () => {
        api.put("todos", {
            description: input
        }).then((response) => {
            // TODO: CHAMAR GET
            props.onSubmit();
            console.log(response.data);
        });
    }

    const addTodo = () => {
        if (!input || /^\s*$/.test(input)) {
            return;
        }

        putData();
    };

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        addTodo();
        setInput('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Write new task here..."
                value={input}
                name="text"
                className="todo-input"
                onChange={handleChange}
            />
            <button type="submit" className="todo-button">Create</button>
            <h1 class="left"> Tasks </h1>
            <hr class="solid" />
        </form >
    )
}

export default TodoForm
