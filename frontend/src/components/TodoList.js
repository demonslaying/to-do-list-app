import React, { useState } from 'react'
import { TiEdit } from 'react-icons/ti'
import { RiCloseCircleLine } from 'react-icons/ri'
import ScrollContainer from 'react-indiana-drag-scroll'

function TodoList({ todos, updateEditTodo, updateTodoState, deleteTodo }) {
    const [showAll, setShowAll] = useState(
        true
    );

    const [sort, setSort] = useState({
        asc: false,
        desc: false,
        date: true
    })

    const orderTodos = (todoA, todoB) => {
        if (sort.date) {
            return todoA.dateAdded - todoB.dateAdded;
        }
        if (sort.asc) {
            return todoA.description.localeCompare(todoB.description)
        }
        if (sort.desc) {
            return todoB.description.localeCompare(todoA.description)
        }
    }

    return <div>
        <h1 className="left" onClick={() => {
            if (sort.asc) {
                setSort({
                    asc: false,
                    desc: true,
                    date: false
                })
            }
            else if (sort.desc) {
                setSort({
                    asc: false,
                    desc: false,
                    date: true
                })
            }
            else {
                setSort({
                    asc: true,
                    desc: false,
                    date: false
                })
            }
        }
        }
        > Tasks </h1>
        <hr className="solid" />
        <ScrollContainer className="scroll-container" horizontal="false">
            {
                todos.filter(todo => todo.state === 'INCOMPLETE' || showAll).sort(orderTodos).map((todo, index) => (
                    <div className={todo.state === 'COMPLETE' ? 'todo-row complete' : 'todo-row'} key={index}>
                        <div className='description' key={todo.task_id} onClick={() => updateTodoState(todo.task_id, todo.state)}>
                            {todo.description}
                        </div>
                        <div className="icons">
                            <TiEdit className='edit-icon' onClick={() => updateEditTodo(todo.task_id, todo.description)} />
                            <RiCloseCircleLine className='delete-icon' onClick={() => deleteTodo(todo.task_id)} />
                        </div>
                    </div >
                ))
            }
        </ScrollContainer>
        <h1 className="left hideComplete" onClick={() => setShowAll(!showAll)}> Hide completed </h1>
    </div>
}

export default TodoList