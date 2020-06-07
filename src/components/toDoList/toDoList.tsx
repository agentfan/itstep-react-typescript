import React, { useEffect } from 'react';
import Item from './item';
import Model from '../../model/model';

interface ToDoListProps {
    model: Model
}

const ToDoList: React.FC<ToDoListProps> = (props) => {
    const { model } = props;

    if(model.list.length === 0) return <div>No tasks</div>;

    const handleListChaned = ()=> {

    }

    useEffect(()=> {
        const subscription:number = model.subscribeToList(handleListChaned);
        return ()=> { model.detachFromList(subscription); }
    });

    return (
        <div>
            {model.list.map( (item:ListItem) => <Item key={item.id} item={item} model={model}/>)}
        </div>
    );
}

export default ToDoList;