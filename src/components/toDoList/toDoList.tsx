import React, { useEffect, useState } from 'react';
import Item from './item';
import Model from '../../model/model';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: '0',
        padding: '0',
        width: '100%',
    },
    empty: {
        margin: '0',
        padding: '1rem',
        width: '100%',
        textAlign: 'center'
    }   
});

interface ToDoListProps {
    model: Model
}

const ToDoList: React.FC<ToDoListProps> = (props) => {
    const classes = useStyles();
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

    if(list.list.length === 0) return <div className={classes.empty}>No tasks</div>;

    return (
        <div className={classes.root}>
            {list.list.map( (item:ListItem) => <Item key={item.id} item={item} model={model}/>)}
        </div>
    );
}

export default ToDoList;