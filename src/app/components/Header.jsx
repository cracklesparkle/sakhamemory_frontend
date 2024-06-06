'use client'

import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { Inter, Montserrat } from 'next/font/google'
import DropDown from './DropDown'
import Logo from './Logo'
const font = Montserrat({ subsets: ["cyrillic-ext"] })

import { Menu, Group, Center, Burger, Container, useMantineTheme, UnstyledButton, ThemeIcon, rem, Box, HoverCard, SimpleGrid, Anchor, Divider, Button, Drawer, ScrollArea, Collapse, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBook, IconChartPie3, IconChevronDown, IconCode, IconCoin, IconFingerprint, IconNotification } from '@tabler/icons-react'

const links = [
  { link: '/', label: 'Главная' },
  {
    link: '/',
    label: 'Проекты',
    links: [
      { link: '/nlrs', label: 'Национальная библиотека РС(Я)' },
      { link: '/archivesakha', label: 'Национальный архив РС(Я)' },
      { link: '/yakutmuseum', label: 'Музей им. Е. Ярославского' },
    ],
  },
  {
    link: '/goskino',
    label: 'Госкинохранилище',
    links: [
      { link: '/goskino/categories', label: 'Кинодокументы' },
    ],
  },
]

const Header = () => {
  //const [opened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Link href={item.link}>
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
      </Link>
    ));

    if (menuItems) {
      return (
        <Link
          href={link.link}
          className={styles.link}
          //onClick={(event) => event.preventDefault()}
        >
          <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>

              <Center>
                <span className={styles.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Menu.Target>
            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
          </Menu>
        </Link>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={styles.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    );
  });


  return (
    <header className={`${styles.header} ${font.className}`}>
      <Group justify="space-between" h="100%">
        <Logo />

        <Group h="100%" gap={0} visibleFrom="sm">
          {items}
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </Group>


      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Память Якутии"
        hiddenFrom="sm"
        zIndex={1000000}
        classNames={{ inner: styles.drawer_inner }}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {links.map((link) => {
            const menuItems = link.links?.map((item) => (
              <Menu.Item key={item.link}>
                <Link href={item.link}>
                  {item.label}
                </Link>
              </Menu.Item>
            ));

            if (menuItems) {
              return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                  <UnstyledButton className={styles.link} onClick={toggleLinks}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        {link.label}
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                      />
                    </Center>
                  </UnstyledButton>
                  <Collapse in={linksOpened}>{menuItems}</Collapse>
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
          })}

        </ScrollArea>
      </Drawer>
    </header>
  );

  // return (
  //   <header className={styles.header}>
  //     <Container size="md">
  //       <div className={styles.inner}>
  //         <Logo />
  //         <Group gap={5} visibleFrom="sm">
  //           {items}
  //         </Group>
  //         <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
  //       </div>
  //     </Container>
  //   </header>
  // );

  // return (
  //   <nav className={`${styles.header} ${font.className}`}>
  //     <Logo />
  //     <DropDown link={{ name: 'Национальная библиотека РС(Я)', link: '/' }} links={[{ name: '/', link: '/' }]} />
  //     <DropDown link={{ name: 'Национальный архив РС(Я)', link: '/' }} links={[]} />
  //     <DropDown link={{ name: 'Музей им. Е. Ярославского', link: '/' }} links={[]} />
  //     <DropDown
  //       link={{ name: 'Госкинохранилище', link: '/goskino' }}
  //       links={[{ name: 'Кинодокументы', link: '/goskino/categories' }]}
  //     />
  //   </nav>
  // )
}

export default Header