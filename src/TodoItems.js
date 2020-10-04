import React from 'react';
import './TodoList.css';
import shortid from 'shortid';

export default class TodoItems extends React.Component {

    render() {
        return (
                <div>
                    {this.props.todos.map(todo => (
                        <ul key={shortid.generate()}>
                            <li key={todo.id} style={{ textDecoration: todo.complete ? 'line-through' : "",
                                backgroundColor: todo.complete ? '#b1daf0' : ""}} 
                                onClick={() => this.props.onToggleComplete(todo.id)}>
                                <div>
                                    {todo.text}
                                    <button className="btn-sm btn-danger" onClick={() => this.props.onHandleDeleteTodo(todo.id)} style={{float: 'right'}}>X</button>
                                </div>
                            </li>
                            <ul>
                                {todo.subActivities.map(todo => (
                                    <li key={todo.id} style={{ textDecoration: todo.complete ? 'line-through' : "",
                                    backgroundColor: todo.complete ? '#b1daf0' : ""}} 
                                    onClick={() => this.props.onToggleSubComplete(todo.id)}>
                                        <div>
                                            {todo.text}
                                            <button className="btn-sm btn-danger" onClick={() => this.props.onHandleDeleteSubTodo(todo.id)} style={{float: 'right'}}>X</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    ))}
                </div>   
        )
    }
}