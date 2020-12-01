import React, { useEffect } from 'react';
import Todo from "./todo";
import { connect } from "react-redux";
import './index.css';
import axios from 'axios';
import Buttons from "../toDoListEdit/simpleAccordion/Button"


function TodoList(state) {
  
  useEffect(() => {
    axios.get('https://todo.eachbase.com/api/GeorgiMxitaryan/todos').then(res => {
      state.getTodoLists(res.data);
    })
  },[]);

  return (
      <div className="TodoList">
        <Buttons createTodo={true} createNewTodo={state.createTodo}>Create new</Buttons>
        {
          state.todos.map(item=> (
            <Todo key={item._id} todo={item} onSelectTodo={ _ => {
              state.onSelectTodo(item._id)
            }}>
            </Todo>
          ))
        }
      </div>
  )
}

const mapStateToProps = ({ todos }) => ({
  todos,
});
  
const mapDispatchToProps = dispatch => {
  return{
    onSelectTodo: selectedItem => dispatch( {type: "SELECT", selectedItem} ),
    getTodoLists: todoLists => dispatch( {type: "GET_ALL_TODOS", todoLists} ),
    createTodo: () => dispatch( {type: "CREATE_TODO"} )
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)