import React, { ChangeEvent, useEffect } from 'react';
import Model from '../../model/model';

interface ItemProps {
    item: ListItem,
    model: Model
}

const Item: React.FC<ItemProps> = (props) => {
    const {item, model} = props;
    const [text, setText] = React.useState<string>(item.text);
    const [done, setDone] = React.useState<boolean>(item.done);

    const handleTaskChanged = (id: number, newItem: ListItem)=> {
        console.log("task changed:",newItem);
        setText(newItem.text);
        setDone(newItem.done);
    }

    useEffect(()=> {
        const subscription:number = model.subscribeToTask(item.id, handleTaskChanged);
        return ()=> { model.detachFromTask(subscription); }
    },[props.item]);

    const handleDelete = ()=> {
        model.removeTask(item.id);
    }

    const handleChanged = (e: ChangeEvent<HTMLInputElement>)=> {
        setText(e.currentTarget.value);
    }

    const handleBlur = ()=> {
        console.log("blur");
        model.changeTextOfTask(item.id, text);
    }

    const handleDone = (e: ChangeEvent<HTMLInputElement>)=> {
        console.log("done");
        model.changeDoneOfTask(item.id, e.currentTarget.checked);
    }

    return (
        <div>
            <span>{`id:${item.id}`}</span>
            <input type="text" value={text} onChange={handleChanged} onBlur={handleBlur}/>
            <input type="checkbox" checked={done} onChange={handleDone}/>
            <button onClick={handleDelete}> Del </button>
        </div>
    );
}

export default Item;