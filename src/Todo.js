import React from 'react';
import {ACTIONS} from './App';

export default function Todo({todo,dispatch}) {
    return (
        <div>
            <span style={{color:todo.completed?'green':'red'}}>
                {todo.title}
            </span>
            <button onClick={()=>dispatch({type:ACTIONS.TOGGLE,payload:{id:todo.id}})}>Toggle</button>
            <button onClick={()=>dispatch({type:ACTIONS.REMOVE,payload:{id:todo.id}})}>Remove</button>
        </div>
    )
}
