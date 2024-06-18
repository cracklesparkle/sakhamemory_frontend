'use client'

import React, { useState, useEffect } from 'react';
import { Button, Card, Flex, Pagination, Paper, Text } from '@mantine/core';
import { Edit } from './Edit';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const AdminPagesEditor = () => {
    const [pages, setPages] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10; // Number of items per page

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch('/api/pages/count');
                const data = await response.json();
                if (response.ok) {
                    setTotal(Math.ceil(data.total / limit));
                } else {
                    console.error('Failed to fetch content count:', data.error);
                }
            } catch (error) {
                console.error('Failed to fetch content count:', error);
            }
        };

        fetchCount();
    }, [limit])

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await fetch(`/api/pages?offset=${(page - 1) * limit}&limit=${limit}`);
                const data = await response.json();
                if (response.ok) {
                    setPages(data);
                } else {
                    console.error('Failed to fetch pages:', data.error);
                }
            } catch (error) {
                console.error('Failed to fetch pages:', error);
            }
        };

        fetchPages();
    }, [page, limit]);

    return (
        <Flex direction={'column'} gap={32} p={16}>
            <h1>Страницы</h1>

            <Flex>
                <Link href={`/newpage/edit`}>
                    <Button>Создать страницу</Button>
                </Link>

            </Flex>

            <Flex direction={'column'} gap={16}>
                {pages.map((page) => (
                    <Card key={page.id}>
                        <Flex key={page.id} align={'center'} justify={'space-between'}>
                            <div>
                                <Text>{page.title}</Text>
                                <Text c="dimmed" size="sm">
                                    {page.category_name}
                                </Text>
                            </div>
                            <Link target='_blank' href={`${page.path}/edit`}>
                                <Edit />
                            </Link>
                        </Flex>
                    </Card>
                ))}
            </Flex>

            <Pagination page={page} onChange={setPage} total={total} />
        </Flex >
    );
};

export default AdminPagesEditor;
