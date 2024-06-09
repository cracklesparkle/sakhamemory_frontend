'use client';

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

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [opened, { open, close }] = useDisclosure(false)
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [resetError, setResetError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res.error) {
            setError(res.error);
        } else {
            router.push('/admin');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/reset-password-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: resetEmail }),
        });

        if (res.ok) {
            setResetMessage('Password reset email sent successfully.');
            setResetError('');
        } else {
            const { error } = await res.json();
            setResetError(error);
            setResetMessage('');
        }
    };

    useEffect(()=>{
        if (email && opened) {
            setResetEmail(email)
        }
    }, [opened])

    return (
        <>
            <Modal
                centered
                withinPortal={true}
                opened={opened}
                onClose={close}
                title="Сброс пароля"
            >
                <form onSubmit={handleResetPassword}>
                    <TextInput
                        label="Почта"
                        placeholder="Введите почту"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <Button type="submit" fullWidth mt="md">
                        Отправить письмо сброса пароля
                    </Button>
                    {resetMessage && <p style={{ color: 'green' }}>{resetMessage}</p>}
                    {resetError && <p style={{ color: 'red' }}>{resetError}</p>}
                </form>
            </Modal>

            <Container size={420} my={40}>
                <Title ta="center">Вход в панель управления</Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput
                        error={error}
                        label="Почта"
                        placeholder="Введите почту"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        label="Пароль"
                        placeholder="Введите пароль"
                        required
                        mt="md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Сохранить вход" />
                        <Anchor component="button" size="sm" onClick={open}>
                            Забыли пароль?
                        </Anchor>
                    </Group>
                    <Button type='submit' onClick={handleSubmit} fullWidth mt="xl">
                        Войти
                    </Button>
                </Paper>
            </Container>
        </>
    );
}