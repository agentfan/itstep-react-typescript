import React, { ChangeEvent, MouseEvent } from 'react';

interface AddItemBlockProps {
    toDoList: ListItem[],
    setToDoList: Function
}

const AddItemBlock: React.FC<AddItemBlockProps> = (props) => {
    const {toDoList, setToDoList} = props;

    const [inputValue, setInputValue] = React.useState<string>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setInputValue(e.currentTarget.value);
    }

    const handleClick =  (e: MouseEvent<HTMLButtonElement>)=> {
        
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={inputValue}/>
            <button onClick={handleClick}>Add Item</button>
        </div>
    );
}

export default AddItemBlock;