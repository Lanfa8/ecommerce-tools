"use client";

import { AppShell, Box, Burger, Button, Group, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import logo from '../app/logo.png'
import Link from 'next/link';
import { IconBarcode, IconImageInPicture, IconQrcode, IconLetterCase, IconTrendingUp, IconShip, IconTag, IconPackage, IconBulb, IconCalculator, IconBrandShopee, IconBrandAmazon, IconScale, IconReceipt } from '@tabler/icons-react';
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
            {process.env.NEXT_PUBLIC_SUGGEST_FEATURE_URL ? (
              <Button
                component="a"
                href={process.env.NEXT_PUBLIC_SUGGEST_FEATURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                color="teal"
                size="compact-sm"
                leftSection={<IconBulb size={16} />}
              >
                Sugerir funcionalidade
              </Button>
            ) : (
              <Box />
            )}
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
    title: "Gerador de Código de Barras",
    icon: <IconBarcode size={24} style={{ display: "inline" }} />,
    href: "/barcode_generator",
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
  },
  {
    title: "Gerador de SKU",
    icon: <IconTag size={24} style={{ display: "inline" }} />,
    href: "/sku_generator",
  },
  {
    title: "Gerador de Produtos Fake",
    icon: <IconPackage size={24} style={{ display: "inline" }} />,
    href: "/fake_product_generator",
  },
  {
    title: "Calculadoras E-commerce",
    icon: <IconCalculator size={24} style={{ display: "inline" }} />,
    href: "/calculators",
  },
  {
    title: "Lucro Shopify",
    icon: <IconBrandShopee size={24} style={{ display: "inline" }} />,
    href: "/calculators/shopify_profit",
  },
  {
    title: "FBA Amazon",
    icon: <IconBrandAmazon size={24} style={{ display: "inline" }} />,
    href: "/calculators/amazon_fba",
  },
  {
    title: "Ponto de Equilíbrio",
    icon: <IconScale size={24} style={{ display: "inline" }} />,
    href: "/calculators/break_even",
  },
  {
    title: "Precificação",
    icon: <IconReceipt size={24} style={{ display: "inline" }} />,
    href: "/calculators/product_pricing",
  }
]