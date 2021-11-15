import React, { useState } from 'react'

function TodoForm(props) {
    const [input, setInput] = useState('')

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            // TODO: CALL THE API CREATE TASK
            id: Math.floor(Math.random() * 10000),
            description: input
        });

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
            <button className="todo-button">Create</button>
            <h1 class="left"> Tasks </h1>
            <hr class="solid" />
        </form >
    )
}

export default TodoForm
