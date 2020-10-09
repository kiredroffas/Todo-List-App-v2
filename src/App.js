import React from 'react';
import './App.css';
import Header from './Header/Header.js';
import TodoList from './TodoList/TodoList.js';

function App() {
  return (
    <div className="App">
      <Header />
      <br/>
      <div className="container-fluid">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
