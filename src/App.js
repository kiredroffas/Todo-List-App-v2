import React from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1" style={{fontSize: '30px'}}>Todo List v.2, Now with React!</span>
        </nav>
        <br/>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
