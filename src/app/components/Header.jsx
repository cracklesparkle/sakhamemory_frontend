'use client'

import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { Inter, Montserrat } from 'next/font/google'
import DropDown from './DropDown'
import Logo from './Logo'
const font = Montserrat({ subsets: ["cyrillic-ext"], preload: false })

import { Menu, Group, Center, Burger, Container, useMantineTheme, UnstyledButton, ThemeIcon, rem, Box, HoverCard, SimpleGrid, Anchor, Divider, Button, Drawer, ScrollArea, Collapse, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBook, IconChartPie3, IconChevronDown, IconCode, IconCoin, IconFingerprint, IconNotification } from '@tabler/icons-react'

const Header = () => {
  //const [opened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const [menuItems, setMenuItems] = useState([])

  const transformData = (data) => {
    const linksMap = {};

    // Create a map of links using id as keys
    data.forEach(item => {
      linksMap[item.id] = { link: item.link, label: item.title, links: [] };
    });

    // Iterate through the data again to build the nested structure based on parent_id
    data.forEach(item => {
      if (item.parent_id !== null) {
        linksMap[item.parent_id].links.push(linksMap[item.id]);
      }
    });

    // Return the top-level links (those with parent_id === null)
    return data.filter(item => item.parent_id === null).map(item => linksMap[item.id]);
  };


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);


  return (
    <header className={`${styles.header} ${font.className}`}>
      <Group justify="space-between" h="100%">
        <Logo />
        <Group h="100%" gap={0} visibleFrom="sm">
          {menuItems.length > 0 && transformData(menuItems).map((link) => {
            const menuItems = link.links?.map((item) => (
              <Link key={item.link} href={item.link}>
                <Menu.Item>{item.label}</Menu.Item>
              </Link>
            ));

            if (menuItems.length > 0) {
              return (
                <Link
                  key={link.link}
                  href={`/${link.link}`}
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
                href={`/${link.link}`}
                className={styles.link}
                onClick={(event) => event.preventDefault()}
              >
                {link.label}
              </Link>
            );
          })}
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

          {menuItems.length > 0 && transformData(menuItems).map((link) => {
            const menuItems = link.links?.map((item) => (
              <Menu.Item key={item.link}>
                <Link href={`/${item.link}`}>
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
                href={`/${link.link}`}
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
}

export default Header