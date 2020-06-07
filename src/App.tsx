import React from 'react';
import Model from './model/model';
import ToDoList from './components/toDoList/toDoList';
import AddItemBlock from './components/addItemBlock/addItemBlock';

const theModel = new Model([]);

const App = () => {
  const [model, setModel] = React.useState<Model>(theModel);

  return (
    <div>
      <ToDoList model={model}/>
      <AddItemBlock model={model}/>
    </div>
  );
}

export default App;
