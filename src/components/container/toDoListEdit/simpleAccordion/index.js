import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Buttons from "./Button";
import TodoInput from "./input";
import ColorPicker from "./CollorPicker";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    margin: "20px",
    borderRadius: "8px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  buttonsStyle:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

let globalState

function SimpleAccordion(state) {
  globalState = state
  const classes = useStyles();

  return (
    <div className={classes.root} style={{backgroundColor: state.showItem.color ? state.showItem.color: "white"}}>
      <Accordion expanded={state.showItem.title? true : false} style={{backgroundColor: "transparent"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <TodoInput
          title={state.showItem.title? state.showItem.title : "Title"}
          active={state.editMode}
          onChangeTitle={title => {
            state.changeTitle(title)
          }}
        />
        </AccordionSummary>
        <AccordionDetails className={classes.buttonsStyle}>
          <TodoInput
            description={state.showItem.description? state.showItem.description : "Description"}
            active={state.editMode}
            onChangeDescription={ description => {
                state.changeDescription(description)
              }
            }
          />
          <Buttons
            selectedItemId= {state.showItem._id}
            mode= {state.editMode}
            onEditTodo={state.onEditTodo}
            onSaveTodo={state.saveTodo}
            dellTodo={state.dellTodo}
          />
          {
            state.editMode?
            <ColorPicker
              onChangeColorTodo={color => {
                state.onChangeColorTodo(color)
              }}
            >

            </ColorPicker>
            :
            <div></div>
          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return{
    onEditTodo: (() => dispatch( {type: "EDIT" } )),
    saveTodo: (() => {
      if(!globalState.showItem._id){
        axios.post('https://todo.eachbase.com/api/GeorgiMxitaryan/todos', globalState.showItem).then(async res => {
          let resData = await res.data
          let newState = [...globalState.todos, resData]
          dispatch( {type: "SAVE", newState, edit:false } )
        })
      }else{
        axios.patch(`https://todo.eachbase.com/api/GeorgiMxitaryan/todos/${globalState.showItem._id}`, globalState.showItem).then(async res => {
          let resData = await res.data
          let newState = globalState.todos.filter(item => item._id !== resData._id)
          newState = [...newState, resData]
          dispatch( {type: "SAVE", newState, edit: true } )
        })
      }
    }),
    changeDescription: (description => dispatch( {type: "CHANGE_DESCRIPTION", description } )),
    changeTitle: (title => dispatch( {type: "CHANGE_TITLE", title } )),
    dellTodo: ( _id => {
      axios.delete(`https://todo.eachbase.com/api/GeorgiMxitaryan/todos/${_id}`).then(async res => {
        let newState = globalState.todos.filter( item => item._id !== _id )
        dispatch( {type: "DELL", newState} )
      })
    }),
    onChangeColorTodo: (color => dispatch( {type: "ON_CHANGE_COLOR", color } ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleAccordion)