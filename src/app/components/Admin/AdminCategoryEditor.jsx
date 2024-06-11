'use client'

import React, { useState, useEffect } from 'react';
import { SortableTree } from './SortableTree';
import { Modal, Button, Flex, Select, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const AdminCategoryEditor = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', link: '', parent_id: null, order: 0, published_at: null });
    const [nestedMenuItems, setNestedMenuItems] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [currentItem, setCurrentItem] = useState({ title: '', link: '', parent_id: null, order: 0, published_at: null })

    const transformMenuItems = (items) => {
        const itemMap = {};
        const result = [];

        items.forEach(item => {
            itemMap[item.id] = { ...item, children: [] };
        });

        items.forEach(item => {
            if (item.parent_id) {
                itemMap[item.parent_id].children.push(itemMap[item.id]);
            } else {
                result.push(itemMap[item.id]);
            }
        });

        return result;
    }

    const flattenMenuItems = (nestedItems) => {
        const result = [];

        const traverse = (items, parentId = null) => {
            items.forEach((item, index) => {
                result.push({
                    id: item.id,
                    title: item.title,
                    link: item.link,
                    parent_id: parentId,
                    order: index,
                    published_at: item.published_at
                });
                if (item.children.length > 0) {
                    traverse(item.children, item.id);
                }
            });
        };

        traverse(nestedItems);
        return result;
    }

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('/api/category');
            const data = await response.json();
            if (Array.isArray(data)) {
                setMenuItems(data);
                setNestedMenuItems(transformMenuItems(data));
            } else {
                console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Failed to fetch menu items', error);
        }
    }

    const saveOrder = async () => {
        try {
            const flattenedItems = flattenMenuItems(nestedMenuItems);
            await fetch('/api/category/reorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: flattenedItems }),
            });
            alert('Order saved successfully');
        } catch (error) {
            console.error('Failed to save order', error);
        }
    }

    const addMenuItem = async () => {
        try {
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            const result = await response.json();

            if (response.ok) {
                const updatedMenuItems = [...menuItems, { ...newItem, id: result.id }];
                setMenuItems(updatedMenuItems);
                setNewItem({ title: '', link: '', parent_id: null, order: 0, published_at: null });
                alert('Menu item added successfully');
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Failed to add menu item', error);
        }
    }

    const onEditMenu = (id) => {
        const item = menuItems.find(item => item.id == id)
        if (item) {
            setCurrentItem(item)
            open()
        }
    }

    const editMenuItem = () => {
        const updatedMenuItems = menuItems.map(item =>
            item.id === currentItem.id ? { ...item, ...currentItem } : item
        );
        setMenuItems(updatedMenuItems);
        close()
    }

    useEffect(() => {
        fetchMenuItems()
    }, [])

    useEffect(() => {
        setNestedMenuItems(transformMenuItems(menuItems));
    }, [menuItems])

    return (
        <Flex direction={'column'} gap={32} p={16}>
            <Modal opened={opened} onClose={close} title="Редактировать меню" centered>
                <Flex gap={16} align={'flex-end'}>
                    <TextInput
                        label="Название"
                        placeholder='Введите название'
                        value={currentItem.title}
                        onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    />

                    <Select
                        comboboxProps={{ withinPortal: true }}
                        data={['/test', 'test2', '/asd', '/as']}
                        placeholder="Выбрать страницу"
                        label="Путь"
                        onChange={(_value, option) => setCurrentItem({ ...currentItem, link: _value })}
                        allowDeselect
                        clearable
                        onClear={() => { setCurrentItem({ ...currentItem, link: '' }) }}
                    />

                    <Button onClick={editMenuItem}>
                        Сохранить
                    </Button>
                </Flex>
            </Modal>

            <h1>Редактор категорий</h1>

            <Flex gap={16}>
                <Button onClick={saveOrder}>Сохранить</Button>
                <Button variant='subtle' onClick={() => fetchMenuItems()}>Отменить</Button>
            </Flex>

            <Flex gap={16} direction={'column'}>
                <Flex gap={16} align={'flex-end'}>
                    <TextInput label="Название" placeholder='Введите название' value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />

                    <Select
                        comboboxProps={{ withinPortal: true }}
                        data={['/test', 'test2', '/asd', '/as']}
                        placeholder="Выбрать страницу"
                        label="Путь"
                        onChange={(_value, option) => setNewItem({ ...newItem, link: _value })}
                        allowDeselect
                        clearable
                        onClear={() => { setNewItem({ ...newItem, link: '' }) }}
                    />

                    <Button onClick={addMenuItem}>
                        Добавить
                    </Button>
                </Flex>

                <div>
                    <SortableTree
                        editable
                        onEdit={onEditMenu}
                        indicator
                        items={nestedMenuItems}
                        setItems={setNestedMenuItems}
                    />
                </div>
            </Flex>

        </Flex>
    );
};

export default AdminCategoryEditor;