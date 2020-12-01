import React from 'react';
import './index.css';
import TodoList from "./todoList"
import TodoListEdit from "../container/toDoListEdit"


export default function Container() {
  return (
      <div className="Container">
        <TodoList></TodoList>
        <TodoListEdit></TodoListEdit>
      </div>
  );
}