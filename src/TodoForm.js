import React from 'react';
import shortid from 'shortid';

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        // TODO: Max 125 chars?
        if (this.state.text !== "") {
            const arr = this.state.text.split("|");
            const primaryTodo = arr[0];

            const subTodos = [];
            if(arr.length > 1) {
                for(let i=1; i < arr.length; i++) {
                    subTodos.push({
                        id: shortid.generate(), 
                        text: arr[i], 
                        complete: false,
                        beingEdited: false
                    })          
                }
            }

            this.props.onSubmit({
                id: shortid.generate(),
                text: primaryTodo,
                complete: false,
                subActivities: subTodos,
                beingEdited: false
            });

            this.setState({
                text: ""
            });
        }
    }

    render() {
        return (
            <div>
                <p>Add subtasks by separating input with a "|"!</p>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        name="text"
                        value={this.state.text} 
                        onChange={this.handleChange} 
                        placeholder="Enter a todo item">
                    </input>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Add Todo</button>
                </form>
                <p><em>By Kiredroffas</em></p>
            </div>
        )
    }
}