import React from 'react';
import ListItem from './list_item';
import AddItem from "./app";
import NavButton from "./nav_button";

const List = (props) => {
        const listElements = props.toDos.map((item) => {
            return <ListItem /*put={()=> props.put(item.complete)}*/
                             delete={() => props.delete(item._id)} key={item._id} title={item.title}/>
        });
        return (
            <div>
                <h1 className="center">To Do List</h1>
                <NavButton to="/add-item" text="Add Item"/>
                <ul className="collection">
                    {listElements}
                </ul>
            </div>
        );
    }

export default List;