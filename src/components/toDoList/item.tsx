import React, { useEffect } from 'react';
import Model from '../../model/model';

interface ItemProps {
    item: ListItem,
    model: Model
}

const Item: React.FC<ItemProps> = (props) => {
    const {item, model} = props;
    const [text, setText] = React.useState<string>(item.text);

    const handleTaskChaned = (id: number, newItem: ListItem)=> {
        setText(newItem.text);
    }

    useEffect(()=> {
        const subscription:number = model.subscribeToTask(item.id, handleTaskChaned);
        return ()=> { model.detachFromTask(subscription); }
    });

    const handleDelete = ()=> {
        model.removeTask(item.id);
    }

    return (
        <div>
            <span>{`id:${item.id} text:${text} ${item.done ? "done" : "not done"}`}</span>
            <button onClick={handleDelete}> Del </button>
        </div>
    );
}

export default Item;