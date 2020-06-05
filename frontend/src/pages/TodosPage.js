import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import TodoItem from '../components/TodoItem';
import Context from '../context/TodoContext';


export const TodosPage = () => {
    const auth = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    const { request } = useHttp();
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const removeTodo = useCallback(async (id) => {
        try {
            const result = await request(`/api/todos/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
        })
            setTodos(result)
        } catch (e) {}
    }, [request])

    const fetchTodos = useCallback(async () => {
        try {
            const fetched = await request('/api/todos/', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
            setTodos(fetched)
        } catch (e) {}
    }, [token, setTodos])

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/todos/createit', 'POST', {
                    description: todo, completed: false
                },
                {
                    Authorization: `Bearer ${token}`
                })
                setTodo('')
                fetchTodos()
            } catch (e) { }
        }
    }

    return (
        <Context.Provider value={{ removeTodo }}>
            <div className="row">
                <div className="col s6 offset-s3">
                    <h1 className="purple-text text-darken-4">Todos Page</h1>
                    <div className="input-field">
                        <input
                            placeholder="Enter your todo and press Enter"
                            id="todo"
                            type="text"
                            value={todo}
                            onChange={e => {setTodo(e.target.value)}}
                            onKeyPress={pressHandler}
                        />
                    </div>
                    <ul>
                        { todos.map((todo, index) => (
                            <TodoItem
                                todo={todo}
                                key={todo._id}
                                index={index}
                                token={token}
                                />
                        )) }
                        </ul>
                </div>
            </div>
        </Context.Provider>
    );
};
