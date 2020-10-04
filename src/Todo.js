import React from 'react';
import './Todo.css';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSubComplete = this.toggleSubComplete.bind(this);
    }

    toggleSubComplete(subId) {
        console.log("Todo got " + subId);
        this.props.toggleSubItem(subId);
    }

    render() {
        return (
            // <li style={{ display: "flex", justifyContent: 'center'}}>
            
            // <li style={{ textDecoration: this.props.todo.complete ? 'line-through' : "",
            //              backgroundColor: this.props.todo.complete ? '#b1daf0' : ""}} 
            //              onClick={this.props.toggleComplete}>
            //     <div> 
            //         {this.props.todo.text}
            //         <button className="btn-sm btn-danger" onClick={this.props.onDelete} style={{float: 'right'}}>X</button>
            //     </div>
            // </li>
            <div>
                <li style={{ textDecoration: this.props.todo.complete ? 'line-through' : "",
                backgroundColor: this.props.todo.complete ? '#b1daf0' : ""}} 
                onClick={this.props.toggleComplete}>
                    <div> 
                        {this.props.todo.text}
                        <button className="btn-sm btn-danger" onClick={this.props.onDelete} style={{float: 'right'}}>X</button>
                    </div>
                </li>
                <ul>
                    {this.props.todo.subActivities.map(todo => (
                        <li key={todo.id} style={{ textDecoration: todo.complete ? 'line-through' : "",
                        backgroundColor: todo.complete ? '#b1daf0' : ""}} 
                        onClick={this.toggleSubComplete(todo.id)}>
                            <div> 
                                {todo.text}
                                <button className="btn-sm btn-danger" onClick={this.props.onDelete} style={{float: 'right'}}>X</button>
                            </div>
                        </li>
                        
                    ))}
                </ul>
            </div>
            
        )
    }
    
}