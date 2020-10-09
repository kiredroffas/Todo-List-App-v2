import React from 'react';
import './TodoList.css';
import shortid from 'shortid';

export default class TodoItems extends React.Component {
    constructor(props) {
        super(props);
        this.editItem = this.editItem.bind(this);
        this.editSubItem = this.editSubItem.bind(this);
    }

    editItem(event) {
        if(this._inputElement.input.value !== "") {
            console.log("edit: " + this._inputElement.input.value + " id: " + this._inputElement.id)
            this.props.onEditTodo(this._inputElement.id, this._inputElement.input.value)
        }
        event.preventDefault();
    }

    editSubItem(event) {
        if(this._inputElement.input.value !== "") {
            console.log("edit: " + this._inputElement.input.value + " id: " + this._inputElement.id)
            this.props.onEditSubTodo(this._inputElement.id, this._inputElement.input.value)
        }
        event.preventDefault();
    }

    render() {
        return (
                <div>
                    {this.props.todos.map(todo => (
                        <ul key={shortid.generate()}>
                            <li key={todo.id} 
                                style={{ textDecoration: todo.complete ? 'line-through' : "",
                                backgroundColor: todo.complete ? '#b1daf0' : ""}} 
                                onClick={() => this.props.onToggleComplete(todo.id)}
                            >
                                <div>
                                    {todo.text}
                                    <button 
                                        className="btn-sm btn-danger"
                                        onClick={() => this.props.onHandleDeleteTodo(todo.id)}
                                        style={{ float: 'right' }}
                                    >
                                        X
                                    </button>
                                    <button
                                        className="btn-default btn-sm"
                                        style={{ float: 'right' }}
                                        onClick={() => {this.props.onToggleComplete(todo.id);
                                                        this.props.onToggleEditTodo(todo.id);}}
                                    >
                                        <span className="material-icons pencil-icon">edit</span>
                                    </button>
                                </div>
                            </li>
                            {(this.props.editMode && todo.beingEdited) &&
                                <form onSubmit={this.editItem}>
                                    <input
                                        ref={(a) => this._inputElement = {input: a, id: todo.id}}
                                        placeholder="Edit todo here">
                                    </input>
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                    <button className="btn btn-danger" onClick={this.props.onResetBeingEdited}>Cancel</button>
                                </form>
                            }
                            <ul>
                                {todo.subActivities.map(todo => (
                                    <div key={shortid.generate()}>
                                        <li key={todo.id} 
                                            style={{ textDecoration: todo.complete ? 'line-through' : "",
                                            backgroundColor: todo.complete ? '#b1daf0' : ""}} 
                                            onClick={() => this.props.onToggleSubComplete(todo.id)}
                                        >
                                            <div>
                                                {todo.text}
                                                <button className="btn-sm btn-danger" 
                                                    onClick={() => this.props.onHandleDeleteSubTodo(todo.id)} 
                                                    style={{float: 'right'}}
                                                >
                                                    X
                                                </button>
                                                <button
                                                    className="btn-default btn-sm"
                                                    style={{ float: 'right' }}
                                                    onClick={() => {this.props.onToggleSubComplete(todo.id);
                                                                    this.props.onToggleEditSubTodo(todo.id);}}
                                                >
                                                    <span className="material-icons pencil-icon">edit</span>
                                                </button>
                                            </div>
                                        </li>
                                        {(this.props.editMode && todo.beingEdited) &&
                                            <form onSubmit={this.editSubItem}>
                                                <input
                                                    ref={(a) => this._inputElement = {input: a, id: todo.id}}
                                                    placeholder="Edit todo here">
                                                </input>
                                                <button className="btn btn-primary" type="submit">Submit</button>
                                                <button className="btn btn-danger" onClick={this.props.onResetBeingEdited}>Cancel</button>
                                            </form>
                                        } 
                                    </div>
                                ))}
                            </ul>
                        </ul>
                    ))}
                </div>   
        )
    }
}