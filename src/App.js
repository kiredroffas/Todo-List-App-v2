import React from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">Todo List v.2, Now with React!</span>
        </nav>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
