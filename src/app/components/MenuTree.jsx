import React from 'react'
import { useEffect, useState } from 'react';

const MenuTree = () => {
    //Analysing hierarchy
    const [parentItems, setParentItems] = useState([]);
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchParentItems();
    }, []);

    const fetchParentItems = () => {
        fetch('/api/menu')
            .then(response => response.json())
            .then(data => {
                setParentItems([data]);
            })
            .catch(error => console.error('Error fetching parent menu:', error));
    };

    const fetchChildren = async (id) => {
        if (items.filter(item => item.parent_id == id).length > 0) {
            setItems(prevItems => prevItems.filter(item => item.parent_id !== id));
        } else {
            await fetch(`/api/menu/${id}`)
                .then(response => response.json())
                .then(data => {
                    //setSelectedItem({ id, children: buildHierarchy(data) });
                    setItems(prevItems => [...prevItems, ...data]);
                })
                .catch(error => console.error(`Error fetching children of menu ${id}:`, error));
        }
    }

    const renderItem = (item) => {
        return (
            <div key={item.title} style={{ paddingLeft: '36px' }}>
                <div onClick={() => {
                    console.log("clicked on ", item.title)
                    fetchChildren(item.id)
                }}>
                    {item.id} {item.title}
                </div>
                <div>
                    {items.length > 0 && items.filter((childItem) => childItem.parent_id == item.id).map((temp) => (
                        renderItem(temp)
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>Menu Hierarchy</h1>

            {items.length}

            {parentItems.length > 0 && parentItems.map(item => (
                renderItem(item)
            ))}
        </div>
    )
}

export default MenuTree