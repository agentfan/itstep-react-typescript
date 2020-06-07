import React, { useEffect, useState } from 'react';
import Item from './item';
import Model from '../../model/model';

interface ToDoListProps {
    model: Model
}

const ToDoList: React.FC<ToDoListProps> = (props) => {
    const { model } = props;
    const [list, setList] = useState<Items>(model.list);

    const handleListChaned = ()=> {
        console.log("changing list of toDoList");
        setList(model.list);
    }

    useEffect(()=> {
        const subscription:number = model.subscribeToList(handleListChaned);
        return ()=> { model.detachFromList(subscription); }
    },[props.model]);

    if(list.list.length === 0) return <div>No tasks</div>;

    return (
        <div>
            {list.list.map( (item:ListItem) => <Item key={item.id} item={item} model={model}/>)}
        </div>
    );
}

export default ToDoList;