import React, { useContext } from "react";
import Context from '../context/TodoContext';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem',
    },
    input: {
        marginRight: '1rem',
    },
};

function TodoItem({ todo, index, token }) {
    const { removeTodo } = useContext(Context);

    return (
        <li style={styles.li}>
            <span>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    style={styles.input}
                />
                <strong>{index + 1}</strong>
                    &nbsp;
                    {todo.description}
            </span>
            <button
            className="purple darken-4 waves-effect waves-light btn-small"
            onClick={ removeTodo.bind(null, todo._id) }>
                &times;
            </button>
        </li>
    );
}

export default TodoItem;
