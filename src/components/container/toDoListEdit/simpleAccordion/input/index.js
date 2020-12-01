import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: "20%"
    },
  },
}));

export default function TodoInput(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <div>
          {
            props.title?
            <TextField 
              onChange={e => {
                props.onChangeTitle(e.target.value)
              }} 
              required id="standard-required" 
              autoFocus={true} 
              disabled={!props.active} 
              label="Title" 
              value={props.title} 
            />
            :
            <TextField 
              onChange={e => {
                props.onChangeDescription(e.target.value)
              }} 
              required id="standard-required" disabled={!props.active} 
              label="Description"
              disabled={!props.active} 
              value={props.description}
            />
          }
        </div> 
    </form>
  );
}
