import React, { ChangeEvent, MouseEvent } from 'react';
import Model from '../../model/model';

interface AddItemBlockProps {
    model: Model
}

const AddItemBlock: React.FC<AddItemBlockProps> = (props) => {
    const {model} = props;

    const [inputValue, setInputValue] = React.useState<string>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setInputValue(e.currentTarget.value);
    }

    const handleClick =  (e: MouseEvent<HTMLButtonElement>)=> {
        model.addTask(inputValue);
/*        let maxID: number;
        let i:number;
        for(maxID = -1, i = 0; toDoList.length>i; i++) {
            if(toDoList[i].id > maxID) maxID = toDoList[i].id;
        }
        let list = [...toDoList,{id: ++maxID, text: inputValue, done: false }];
        setToDoList(list);*/
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={inputValue}/>
            <button onClick={handleClick}>Add Item</button>
        </div>
    );
}

export default AddItemBlock;