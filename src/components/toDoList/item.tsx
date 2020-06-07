import React, { useEffect } from 'react';
import Model from '../../model/model';

interface ItemProps {
    item: ListItem,
    model: Model
}

const Item: React.FC<ItemProps> = (props) => {
    const {item, model} = props;
    const [text, setText] = React.useState<ListItem>(item);

    const handleTaskChaned = (id: number, newItem: ListItem)=> {
        setText(newItem);
    }

    useEffect(()=> {
        const subscription:number = model.subscribeToTask(item.id, handleTaskChaned);
        return ()=> { model.detachFromTask(subscription); }
    });

    return (
        <div>
            {`id:${item.id} text:${item.text} ${item.done ? "done" : "not done"}`}
        </div>
    );
}

export default Item;