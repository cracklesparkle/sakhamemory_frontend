'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
    Modal,
} from '@mantine/core';

export default function Setup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const { error } = await res.json();
                setError(error);
                return;
            }

            router.push('/admin');
        } catch (err) {
            setError('Error creating admin user');
        }
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center">Регистрация администратора</Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="Введите e-mail"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Создайте пароль"
                    required
                    mt="md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type='submit' onClick={handleSubmit} fullWidth mt="xl">
                    Регистрация
                </Button>
            </Paper>
        </Container>
    )
}