'use client'

import React, { useState, useEffect } from 'react';
import BlockQuote from '../../components/BlockQuote';
import ContentHeader from '../../components/ContentHeader';
import { Inter, Montserrat, Open_Sans } from 'next/font/google'
import { HeroImageBackground } from '../../components/HeroImageBackground';
import { GridAsymmetrical, NlrsSubgrid } from '../../components/GridAsymmetrical';
import { Card, Container, Grid, Text } from '@mantine/core';
const font = Montserrat({ subsets: ["cyrillic-ext"] })

const NlrsPage = () => {
    const [items, setItems] = useState([])

    const fetchChildren = async (id) => {
        await fetch(`/api/menu/${id}`)
            .then(response => response.json())
            .then(data => {
                //setSelectedItem({ id, children: buildHierarchy(data) });
                setItems(data);
            })
            .catch(error => console.error(`Error fetching children of menu ${id}:`, error));
    }

    useEffect(() => {
        fetchChildren(1812)
    }, [])

    const pattern = [8, 4, 4, 8, 7, 5];

    return (
        <div>
            <HeroImageBackground />

            <Container my="md">
                <Grid>
                    {items.length > 0 && items.map((child, index) => (
                        <Grid.Col key={index} span={{ base: 12, xs: pattern[index % pattern.length] }}>
                            <Card h={'100%'} bg={'rgba(66,66,66,1)'}>
                                <Text c={'white'} className={font.className} size="xl">{child.title}</Text>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default NlrsPage;