'use client'

import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import DropDown from './DropDown'
import Logo from './Logo'
const font = Inter({ subsets: ["cyrillic-ext"] })

import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react'

const links = [
  { link: '/about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={styles.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={styles.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={styles.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={styles.header}>
      <Container size="md">
        <div className={styles.inner}>
          <Logo />
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );

  return (
    <nav className={`${styles.header} ${font.className}`}>
      <Logo />
      <DropDown link={{ name: 'Национальная библиотека РС(Я)', link: '/' }} links={[{ name: '/', link: '/' }]} />
      <DropDown link={{ name: 'Национальный архив РС(Я)', link: '/' }} links={[]} />
      <DropDown link={{ name: 'Музей им. Е. Ярославского', link: '/' }} links={[]} />
      <DropDown
        link={{ name: 'Госкинохранилище', link: '/goskino' }}
        links={[{ name: 'Кинодокументы', link: '/goskino/categories' }]}
      />
    </nav>
  )
}

export default Header