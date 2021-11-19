import React, { useEffect, useState, useRef } from 'react'
import api from "../services/api"

function TodoForm({ onSubmit, edit }) {
    const [input, setInput] = useState(edit ? edit.description : '');

    const addTodo = () => {
        if (!input || /^\s*$/.test(input)) {
            return;
        }

        api.put("todos", {
            description: input
        }).then((response) => {
            onSubmit();
        });
    }

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (edit?.task_id) {
            onSubmit(edit.task_id, input);
        }
        else {
            addTodo();
        }
        setInput('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {edit ? (
                <>
                    <input
                        type="text"
                        value={input}
                        name="text"
                        className="todo-input edit"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button type="submit" className="todo-button edit">Update</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Write new task here..."
                        value={input}
                        name="text"
                        className="todo-input"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button type="submit" className="todo-button">Create</button>
                </>
            )}
        </form >
    );
}

export default TodoForm
