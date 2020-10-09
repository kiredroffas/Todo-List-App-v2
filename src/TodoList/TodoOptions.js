import React from 'react';
import './TodoList.css';

export default class TodoOptions extends React.Component {

    render() {
        return (
                <div>
                    <div style={{ color: 'white'}}>
                        todos left: {this.props.todos.filter(todo => !todo.complete).length}
                    </div>
                    <div>
                        <button onClick={() => this.props.onUpdateTodoToShow("all")}>all</button>
                        <button onClick={() => this.props.onUpdateTodoToShow("active")}>active</button>
                        <button onClick={() => this.props.onUpdateTodoToShow("complete")}>complete</button>
                    </div>
                    <div>
                        <button onClick={() => this.props.onToggleAllTodos()}>
                            toggle all: {`${this.props.toggleAllCompleteStatus}`}
                        </button>
                    </div>
                    {this.props.todos.some(todo => todo.complete) ? ( 
                        <div>
                            <button onClick={() => this.props.onRemoveCompletedTodos()}>remove all complete</button>
                        </div> 
                    ) : null}
                </div>   
        )
    }
}