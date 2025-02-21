"use client";

import { AppShell, Box, Burger, Group, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import logo from '../app/logo.png'
import Link from 'next/link';
import { IconBarcode } from '@tabler/icons-react';

export function PageWrapper({children}: {children: React.ReactNode}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Link href="/">
            <Image
              src={logo}
              width={30}
              height={30}
              alt="ecommerce tools logo"
            />
          </Link>
          <Box />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Text>Recursos</Text>
        <Space h="md" />
        {ResourceMap.map((resource) => (
          <Link key={resource.title}
            href={resource.href}
            passHref
          >
            <Box>
              {resource.icon} {resource.title}
            </Box>
          </Link>
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

const ResourceMap = [
  {
    title: "Gerador de EAN/GTIN-13",
    icon: <IconBarcode size={24} style={{ display: "inline" }} />,
    href: "/generate_gtin",
  }
]