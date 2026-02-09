"use client";

import { AppShell, Box, Burger, Group, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import logo from '../app/logo.png'
import Link from 'next/link';
import { IconBarcode, IconImageInPicture, IconQrcode, IconLetterCase, IconTrendingUp, IconShip } from '@tabler/icons-react';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
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
        <AppShell.Navbar p="md" withBorder>
          <Text>Recursos</Text>
          <Space h="md" />
          {ResourceMap.map((resource) => (
            <React.Fragment key={resource.title}>
              <Link key={resource.title}
                href={resource.href}
                passHref
              >
                <Box>
                  {resource.icon} {resource.title}
                </Box>
              </Link>
              <Space h="sm" />
            </React.Fragment>
          ))}
        </AppShell.Navbar>
        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    </QueryClientProvider>
  );
}

const ResourceMap = [
  {
    title: "Gerador de EAN/GTIN-13",
    icon: <IconBarcode size={24} style={{ display: "inline" }} />,
    href: "/generate_gtin",
  },
  {
    title: "Removedor de Fundo de Imagens",
    icon: <IconImageInPicture size={24} style={{ display: "inline" }} />,
    href: "/images/remove_background",
  },
  {
    title: "Gerador de QR Code",
    icon: <IconQrcode size={24} style={{ display: "inline" }} />,
    href: "/qr_code_generator",
  },
  {
    title: "Contador de Caracteres",
    icon: <IconLetterCase size={24} style={{ display: "inline" }} />,
    href: "/character_counter",
  },
  {
    title: "Tendências Mercado Livre",
    icon: <IconTrendingUp size={24} style={{ display: "inline" }} />,
    href: "/trends/mercadolivre",
  },
  {
    title: "COMEXSTAT",
    icon: <IconShip size={24} style={{ display: "inline" }} />,
    href: "/comexstat",
  }
]