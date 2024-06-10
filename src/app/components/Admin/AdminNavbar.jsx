'use client'

import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
    IconList,
    IconListDetails,
    IconFile3d,
    IconFilePlus,
    IconMenu2,
    IconListTree,
} from '@tabler/icons-react';
import classes from './AdminNavbar.module.scss';
import Link from 'next/link';

const data = [
    { link: '/admin/menu', label: 'Меню', icon: IconListTree },
    { link: '/admin/categories', label: 'Категории', icon: IconListDetails },
    { link: '/admin/pages', label: 'Страницы', icon: IconFilePlus },
    { link: '/admin/settings', label: 'Настройки', icon: IconSettings },
];

export function AdminNavbar({
    user = '',
    handleSignOut
}) {
    const [active, setActive] = useState('');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                //event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <Code fw={700} className={classes.version}>
                        {user}
                    </Code>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <div className={classes.link} onClick={()=>{handleSignOut?.()}}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Выход из аккаунта</span>
                </div>
            </div>
        </nav>
    );
}