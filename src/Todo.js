import React from 'react';

export default class Todo extends React.Component {

    render() {
        return (
            <div 
                style={{ textDecoration: this.props.todo.complete ? 'line-through' : ""}} 
                onClick={this.props.toggleComplete}> 
                {this.props.todo.text}
            </div>  
        )
    }
    
}