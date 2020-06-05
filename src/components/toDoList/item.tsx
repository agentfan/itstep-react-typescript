import React from 'react';

interface ItemProps {
    item: ListItem
}

const Item: React.FC<ItemProps> = (props) => {
    const {item} = props;

    return (
        <div>
            {`id:${item.id} text:${item.text} ${item.done ? "done" : "not done"}`}
        </div>
    );
}

export default Item;