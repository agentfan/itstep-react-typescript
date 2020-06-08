import React from 'react';
import Model from './model/model';
import ToDoList from './components/toDoList/toDoList';
import AddItemBlock from './components/addItemBlock/addItemBlock';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '1rem auto',
    maxWidth: '800px',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    padding: '0.5rem',
    display: 'grid',
    gridTemplateColumns: '2rem 1fr 4rem 4rem',
    backgroundColor: 'brown',
    color: 'white',
    '& div': {
      textAlign: 'center'
    }
  },
  notes: {
    padding: '0.5rem',
    fontStyle: 'italic',
    forntSize: '0.85rem',
    color: 'grey'
  }
});

const theModel = new Model([]);

const App = () => {
  const classes = useStyles();

  const [model, setModel] = React.useState<Model>(theModel);

  let textSort = true;  // true - sort "Up"; false - sort "Down"
  const handleSortText = () => {
    if (textSort) model.sortTextUp();
    else model.sortTextDown();
    textSort = !textSort;
  }

  let doneSort = true;  // true - sort "Up"; false - sort "Down"
  const handleSortDone = () => {
    if (doneSort) model.sortDoneUp();
    else model.sortDoneDown();
    doneSort = !doneSort;
  }

  let idSort = true;  // true - sort "Up"; false - sort "Down"
  const handleSortId = () => {
    if (idSort) model.sortIdUp();
    else model.sortIdDown();
    idSort = !idSort;
  }

  return (
    <div className={classes.root}>
      <AddItemBlock model={model} />
      <div className={classes.header}>
        <div onClick={handleSortId}>ID</div>
        <div onClick={handleSortText}>Text</div>
        <div onClick={handleSortDone}>Done</div>
        <div>Remove</div>
      </div>
      <ToDoList model={model} />
      <div className={classes.notes} >
        for sorting click on the headers of the table
      </div>
    </div>
  );
}

export default App;
