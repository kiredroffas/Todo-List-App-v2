import React from 'react';
import './TodoList.css';
import TodoForm from './TodoForm.js';
import Todo from './Todo.js';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todoToShow: "all",
            toggleAllComplete: true
        };

        this.addTodo = this.addTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.updateTodoToShow = this.updateTodoToShow.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.removeCompletedTodos = this.removeCompletedTodos.bind(this);
    }
    
    addTodo(todo) {
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }))
    }

    toggleComplete(id) {
        this.setState(state => ({
            todos: state.todos.map(todo => {
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
        }))
    }

    handleDeleteTodo(id) {
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }))
    }

    removeCompletedTodos() {
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.complete === false)
        }))
    }

    updateTodoToShow(str) {
        this.setState({
            todoToShow: str
        })
    }

    render() {
        let todos = [];

        if(this.state.todoToShow === "all") {
            todos = this.state.todos;
        }
        else if (this.state.todoToShow === "active") {
            todos = this.state.todos.filter(todo => !todo.complete);
        }
        else if (this.state.todoToShow === "complete") {
            todos = this.state.todos.filter(todo => todo.complete);
        }

        return (
            <div>
                <TodoForm onSubmit={this.addTodo}/>
                {todos.map(todo => (
                    <Todo 
                        key={todo.id} 
                        toggleComplete={() => this.toggleComplete(todo.id)} 
                        onDelete={() => this.handleDeleteTodo(todo.id)}
                        todo={todo}
                    />
                ))}
                <div>
                    todos left: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button onClick={() => this.updateTodoToShow("all")}>all</button>
                    <button onClick={() => this.updateTodoToShow("active")}>active</button>
                    <button onClick={() => this.updateTodoToShow("complete")}>complete</button>
                </div>
                {this.state.todos.some(todo => todo.complete).length ? ( 
                    <div>
                        <button onClick={this.removeCompletedTodos}>remove all complete</button>
                    </div> 
                ) : null}
                <div>
                    <button onClick={() => {
                        this.setState(state => ({
                            todos: state.todos.map(todo => ({
                                ...todo,
                                complete: state.toggleAllComplete
                            })),
                            toggleAllComplete: !state.toggleAllComplete
                        }))
                    }}>
                        toggle all: {`${this.state.toggleAllComplete}`}
                    </button>
                </div>
            </div>
            
        )
    }
}