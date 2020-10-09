import React from 'react';
import './TodoList.css';
import TodoForm from './TodoForm.js';
import TodoItems from './TodoItems.js';
import TodoOptions from './TodoOptions.js';

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
        this.toggleEditSubTodo = this.toggleEditSubTodo.bind(this);
        this.resetBeingEdited = this.resetBeingEdited.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.editSubTodo = this.editSubTodo.bind(this);
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
            // console.log(todo)
            for(let subTodo of todo.subActivities) {
                // console.log(subTodo.id)
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
        let todoCopy = this.state.todos.slice();
        console.log("resetting")
        for(let todo of todoCopy) {
            console.log(todo)
            todo.beingEdited = false;
            for(let subTodo of todo.subActivities) {
                subTodo.beingEdited = false;
            }
        }

        this.setState({
            todos: todoCopy,
            editMode: false
        })
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

    toggleEditSubTodo(subId) {
        if(this.state.editMode) {
            this.resetBeingEdited();
        }
        else {
            let todoCopy = this.state.todos.slice();
        
            for(let todo of todoCopy) {
                for(let subTodo of todo.subActivities) {
                    if(subTodo.id === subId) {
                        subTodo.beingEdited = true;
                    }
                }
            }

            this.setState({
                todos: todoCopy,
                editMode: true
            })
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
        }), () => this.resetBeingEdited())
    }

    editSubTodo(subId, newText) {
        let todoCopy = this.state.todos.slice();
        
        for(let todo of todoCopy) {
            for(let subTodo of todo.subActivities) {
                if(subTodo.id === subId) {
                    subTodo.text = newText;
                }
            }
        }

        this.setState({
            todos: todoCopy
        }, () => this.resetBeingEdited())
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
                    onToggleEditSubTodo={(subId) => this.toggleEditSubTodo(subId)}
                    onEditTodo={(id, newText) => this.editTodo(id, newText)}
                    onEditSubTodo={(subId, newText) => this.editSubTodo(subId, newText)}
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