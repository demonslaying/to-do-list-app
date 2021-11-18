import React, { useEffect, useState, useRef } from 'react'
import api from "../services/api"

function TodoForm(props, { onSubmit }) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const putData = () => {
        api.put("todos", {
            description: input
        }).then((response) => {
            // TODO: CHAMAR GET
            // TODO: RETIRAR O ELEM APAGADO E APRESENTAR A LISTA
            onSubmit();
        });
    }

    const addTodo = () => {
        if (!input || /^\s*$/.test(input)) {
            return;
        }
        putData();
    };

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

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
            {props.edit ? (
                <>
                    <input
                        type="text"
                        placeholder="Update your task here..."
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
                    <h1 className="left"> Tasks </h1>
                    <hr className="solid" />
                </>
            )}

        </form >
    );
}

export default TodoForm
