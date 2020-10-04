import React from 'react';
import './TodoList.css';
import TodoForm from './TodoForm.js';
import TodoItems from './TodoItems.js';

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
        this.toggleSubComplete = this.toggleSubComplete.bind(this);
        this.updateTodoToShow = this.updateTodoToShow.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.handleDeleteSubTodo = this.handleDeleteSubTodo.bind(this);
        this.removeCompletedTodos = this.removeCompletedTodos.bind(this);
    }
    
    addTodo(todo) {
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }), () => {
            console.log(this.state.todos);
        })
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

    toggleSubComplete(id) {
        let todoCopy = this.state.todos.slice();
        
        for(let todo of todoCopy) {
            console.log(todo)
            for(let subTodo of todo.subActivities) {
                console.log(subTodo.id)
                if(subTodo.id === id) {
                    subTodo.complete = !subTodo.complete;
                    break;
                }
            }
        }

        this.setState({
            todos: todoCopy
        })
    }

    handleDeleteTodo(id) {
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }))
    }

    handleDeleteSubTodo(subId) {
        let todoCopy = this.state.todos.slice();
        
        for(let todo of todoCopy) {
            console.log(todo)
            for(let [i, subTodo] of todo.subActivities.entries()) {
                console.log(i,subTodo.id)
                if(subTodo.id === subId) {
                    todo.subActivities.splice(i, 1);
                    break;
                }
            }
        }

        this.setState({
            todos: todoCopy
        })
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
                <TodoItems 
                    todos={todos} 
                    onToggleComplete={(id) => this.toggleComplete(id)}
                    onHandleDeleteTodo={(id) => this.handleDeleteTodo(id)}
                    onToggleSubComplete={(subId) => this.toggleSubComplete(subId)}
                    onHandleDeleteSubTodo={(subId) => this.handleDeleteSubTodo(subId)}
                />
                <div>
                    todos left: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button onClick={() => this.updateTodoToShow("all")}>all</button>
                    <button onClick={() => this.updateTodoToShow("active")}>active</button>
                    <button onClick={() => this.updateTodoToShow("complete")}>complete</button>
                </div>
                {this.state.todos.some(todo => todo.complete) ? ( 
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