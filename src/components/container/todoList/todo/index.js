import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "./index.css"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Todo(props) {
  const classes = useStyles();

  return (
    <div 
    className="Todo" 
    onClick={props.onSelectTodo}>
      <List component="nav" 
        className={classes.root} 
        aria-label="mailbox folders"
      >
        <ListItem button>
          <ListItemText primary={props.todo.title} />
        </ListItem>
      </List>
    </div>
  );
}
  
