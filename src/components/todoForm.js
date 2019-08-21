// component has been copied into todoList component, so that state will update

import React, { useState, useReducer } from 'react';
import { initialState, Reducer } from '../reducers/reducer';

function TodoForm(){
    const [state, dispatch] = useReducer(Reducer, initialState)
    const [newTodo, setNewTodo] = useState();
    const handleChanges = e =>{
        setNewTodo(e.target.value);
    };
    return (
        <div>
            <input
                type="text"
                name="newTodo"
                value={newTodo}
                onChange={handleChanges}
                />
            <button onClick={()=>{
                dispatch({type: "NEW_TODO", payload: newTodo})
            }}>Add Todo</button>
        </div>
    )
}

export default TodoForm;