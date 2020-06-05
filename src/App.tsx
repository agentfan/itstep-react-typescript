import React from 'react';
import ToDoList from './components/toDoList/toDoList';
import AddItemBlock from './components/addItemBlock/addItemBlock';

const App = () => {
  const [toDoList, setToDolist] = React.useState<ListItem[]>([]);

  return (
    <div>
      <ToDoList toDoList={toDoList}/>
      <AddItemBlock toDoList={toDoList, setToDolist}/>
    </div>
  );
}

export default App;
