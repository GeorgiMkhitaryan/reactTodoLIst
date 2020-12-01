import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import "./index.css"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  }
}));

export default function Buttons(props) {
  const classes = useStyles();

  return (
    <div className="Button">
      {
        props.createTodo?
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={props.createNewTodo}
        >
          Create
        </Button>
        :
        <div style={ { flex: 1 } }>
          { props.mode?
            <div className="editDeleteBut">
              <Button
                disabled={props.mode}
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                onClick={props.onSaveTodo}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </div>
          :
          <div className="editDeleteBut">
            <Button
              onClick={()=> {
                props.dellTodo(props.selectedItemId)
              }}
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={props.onEditTodo}
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Edit
            </Button>
          </div>
          }
        </div>
      }
    </div>
  );
}
