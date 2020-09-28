import React from 'react';
import './TodoList.css';
import TodoForm from './TodoForm.js';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };

        this.addTodo = this.addTodo.bind(this);
    }
    
    
    
    addTodo(todo) {
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }

    render() {
        return (
            <div>
                <TodoForm onSubmit={this.addTodo}/>
                {this.state.todos.map(todo => (
                    <div key={todo.id}>{todo.text}</div>
                ))}
            </div>
            
        )
    }
}