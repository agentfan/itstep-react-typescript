import React from 'react';
import Model from './model/model';
import ToDoList from './components/toDoList/toDoList';
import AddItemBlock from './components/addItemBlock/addItemBlock';

const theModel = new Model([]);

const App = () => {
  const [model, setModel] = React.useState<Model>(theModel);

  const handleSortTextUp = ()=> {
    model.sortTextUp();
  }

  const handleSortTextDown = ()=> {
    model.sortTextDown();
  }

  const handleSortDonetUp = ()=> {
    model.sortDoneUp();
  }

  const handleSortDoneDown = ()=> {
    model.sortDoneDown();
  }

  return (
    <div>
      <AddItemBlock model={model}/>
      <div>
        <button onClick={handleSortTextUp}>Sort Text Up</button>
        <button onClick={handleSortTextDown}>Sort Text Down</button>
      </div>
      <div>
        <button onClick={handleSortDonetUp}>Sort Done Up</button>
        <button onClick={handleSortDoneDown}>Sort Done Down</button>
      </div>
      <ToDoList model={model}/>
    </div>
  );
}

export default App;
