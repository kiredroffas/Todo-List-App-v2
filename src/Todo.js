import React from 'react';
import './Todo.css';

export default class Todo extends React.Component {

    render() {
        return (
            <div style={{ display: "flex", justifyContent: 'center'}}>
                <div 
                    style={{ textDecoration: this.props.todo.complete ? 'line-through' : ""}} 
                    onClick={this.props.toggleComplete}> 
                    {this.props.todo.text}
                </div>  
                <button className="btn-sm btn-danger" onClick={this.props.onDelete}>X</button>
            </div>
        )
    }
    
}