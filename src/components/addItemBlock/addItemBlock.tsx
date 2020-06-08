import React, { ChangeEvent, MouseEvent } from 'react';
import Model from '../../model/model';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: '1rem 0 1rem 2.5rem',
        padding: '0',
        width: 'calc(100% - 3.5rem)',
        display: 'grid',
        gridTemplateColumns: '1fr 7rem',
        '& input': {
            fontSize: '1rem',
            padding: '0.25rem 0.5rem',
            width: 'calc(100% - 1.7rem)'
        },
        '& button': {
            width: 'calc(100%)',
            fontSize: '1rem'
        }
    }
});

interface AddItemBlockProps {
    model: Model
}

const AddItemBlock: React.FC<AddItemBlockProps> = (props) => {
    const classes = useStyles();

    const { model } = props;

    const [inputValue, setInputValue] = React.useState<string>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        model.addTask(inputValue);
        setInputValue("");
    }

    return (
        <div className={classes.root}>
            <div>
                <input type="text" onChange={handleChange} value={inputValue} />
            </div>
            <div>
                <button onClick={handleClick}>Add Item</button>
            </div>
        </div>
    );
}

export default AddItemBlock;