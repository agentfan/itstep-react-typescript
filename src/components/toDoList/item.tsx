import React, { ChangeEvent, useEffect } from 'react';
import Model from '../../model/model';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: '0',
        padding: '0.25rem 0.5rem',
        width: 'calc(100% - 1rem)',
        display: 'grid',
        gridTemplateColumns: '2rem 1fr 4rem 4rem',
        borderBottom: '1px solid grey',
    },
    id: {
        padding: '0.25rem 0.5rem',
        textAlign: 'right',
        fontStyle: 'italic'
    },    
    text: {
        '& input': {
            padding: '0.25rem 0.5rem',
            border: 'none',
            fontSize: '1rem',
            width: 'calc(100% - 1rem)'
        }
    },
    done: {
        '& input': {
            fontSize: '1rem',
            width: '3rem',
        }
    },
    remove: {
        textAlign: 'center',
        '& button': {
            fontSize: '1rem',
            width: '2rem'
        }
    }    
});

interface ItemProps {
    item: ListItem,
    model: Model
}

const Item: React.FC<ItemProps> = (props) => {
    const classes = useStyles();
    const { item, model } = props;
    const [text, setText] = React.useState<string>(item.text);
    const [done, setDone] = React.useState<boolean>(item.done);

    const handleTaskChanged = (id: number, newItem: ListItem) => {
        setText(newItem.text);
        setDone(newItem.done);
    }

    useEffect(() => {
        const subscription: number = model.subscribeToTask(item.id, handleTaskChanged);
        return () => { model.detachFromTask(subscription); }
    }, [props.model]);

    const handleDelete = () => {
        model.removeTask(item.id);
    }

    const handleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
    }

    const handleBlur = () => {
        model.changeTextOfTask(item.id, text);
    }

    const handleDone = (e: ChangeEvent<HTMLInputElement>) => {
        model.changeDoneOfTask(item.id, e.currentTarget.checked);
    }

    return (
        <div className={classes.root}>
            <div className={classes.id}>
                {item.id}
            </div>
            <div className={classes.text}>
                <input type="text" value={text} onChange={handleChanged} onBlur={handleBlur} />
            </div>
            <div className={classes.done}>
                <input type="checkbox" checked={done} onChange={handleDone} />
            </div>
            <div className={classes.remove}>
                <button onClick={handleDelete}>X</button>
            </div>
        </div>
    );
}

export default Item;