import React from 'react';
import './TodoList.css';
import TodoForm from './TodoForm.js';
import TodoItems from './TodoItems.js';
import TodoOptions from './TodoOptions';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todoToShow: "all",
            toggleAllComplete: true,
            editMode: false
        };

        this.addTodo = this.addTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.toggleSubComplete = this.toggleSubComplete.bind(this);
        this.updateTodoToShow = this.updateTodoToShow.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.handleDeleteSubTodo = this.handleDeleteSubTodo.bind(this);
        this.removeCompletedTodos = this.removeCompletedTodos.bind(this);
        this.toggleAllTodos = this.toggleAllTodos.bind(this);
        this.toggleEditTodo = this.toggleEditTodo.bind(this);
        this.resetBeingEdited = this.resetBeingEdited.bind(this);
        this.editTodo = this.editTodo.bind(this);
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

    toggleAllTodos() {
        this.setState(state => ({
            todos: state.todos.map(todo => ({
                ...todo,
                complete: state.toggleAllComplete
            })),
            toggleAllComplete: !state.toggleAllComplete
        }))
    }

    updateTodoToShow(str) {
        this.setState({
            todoToShow: str
        })
    }

    resetBeingEdited() {
        this.setState(state => ({
            todos: state.todos.map(todo => {
                if(todo.beingEdited) {
                    return {
                        ...todo,
                        beingEdited: false
                    }
                }
                else {
                    return todo;
                }
            }),
            editMode: false
        }))
        
    }

    toggleEditTodo(id) {
        if(this.state.editMode) {
            this.resetBeingEdited();
        }
        else {
            this.setState(state => ({
                todos: state.todos.map(todo => {
                    if(todo.id === id) {
                        return {
                            ...todo,
                            beingEdited: true
                        }
                    }
                    else {
                        return todo;
                    }
                }),
                editMode: true
            }))
        }
    }

    editTodo(id, newText) {
        this.setState(state => ({
            todos: state.todos.map(todo => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        text: newText
                    }
                }
                else {
                    return todo;
                }
            })
        }))
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
                    editMode={this.state.editMode}
                    onToggleEditTodo={(id) => this.toggleEditTodo(id)}
                    onEditTodo={(id, newText) => this.editTodo(id, newText)}
                    onResetBeingEdited={() => this.resetBeingEdited()}
                    onToggleComplete={(id) => this.toggleComplete(id)}
                    onToggleSubComplete={(subId) => this.toggleSubComplete(subId)}
                    onHandleDeleteTodo={(id) => this.handleDeleteTodo(id)}
                    onHandleDeleteSubTodo={(subId) => this.handleDeleteSubTodo(subId)}
                />
                <TodoOptions 
                    todos={todos}
                    onUpdateTodoToShow={(str) => this.updateTodoToShow(str)}
                    onRemoveCompletedTodos={this.removeCompletedTodos}
                    onToggleAllTodos={this.toggleAllTodos}
                    toggleAllCompleteStatus={this.state.toggleAllComplete}
                />
            </div>
            
        )
    }
}