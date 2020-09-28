import React from 'react';
import './TodoList.css';
import TodoForm from './TodoForm.js';
import Todo from './Todo.js';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };

        this.addTodo = this.addTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }
    
    
    
    addTodo(todo) {
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }

    toggleComplete(id) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if(todo.id === id) {
                    return {
                        // id: todo.id,
                        // text: todo.text,
                        // complete: !todo.complete
                        ...todo,
                        complete: !todo.complete
                    }
                }
                else {
                    return todo;
                }
            })
        })
    }

    render() {
        return (
            <div>
                <TodoForm onSubmit={this.addTodo}/>
                {this.state.todos.map(todo => (
                    <Todo 
                        key={todo.id} 
                        toggleComplete={() => this.toggleComplete(todo.id)} 
                        todo={todo}
                    />
                ))}
            </div>
            
        )
    }
}