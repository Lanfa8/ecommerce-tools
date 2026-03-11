'use client';

import { AppShell, Box, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from './logo.png';
import ScrollDownButton from "@/components/ScrollDownButton";
import ResourcesContainer from "@/components/ResourcesContainer";
import { IconArrowDown } from "@tabler/icons-react";

export default function Home() {
  const scrollToComponent = () => {
    const element = document.getElementById("recursos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="center">
          <Link href="/">
            <Image
              src={logo}
              width={30}
              height={30}
              alt="Ecommerce Tools - Ferramentas Gratuitas para E-commerce"
            />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Main>

        <Center h={"70vh"}>
          <Box w={"50%"} >
            <Title order={1} size={60} textWrap="pretty" style={{ textAlign: "center" }}>
              Todas ferramentas que você precisa para testar e potencializar seu <Box component="span" c="teal" fw={700}>e-commerce</Box>
            </Title>
            <Text ta="center" c="dimmed" mt="md" size="lg">
              Ferramentas 100% gratuitas e online: Gerador de GTIN/EAN, Código de Barras, QR Code,
              Removedor de Fundo de Imagens, Contador de Caracteres e Tendências do Mercado Livre.
            </Text>
            <Center>
              <Button onClick={scrollToComponent} size="lg" mt="xl" color="teal">
                Começar Agora
              </Button>
            </Center>
          </Box>
        </Center>
        <Center h={"30vh"}>
          <ScrollDownButton
            targetId="recursos"
            component={<IconArrowDown size={48} color="var(--mantine-color-teal-5)" />}
          />
        </Center>
        <ResourcesContainer />
        <Center mt={80} mb={40}>
          <Box w={{ base: '90%', sm: '70%', md: '60%' }}>
            <Title order={2} ta="center" mb="lg">
              Por que usar o Ecommerce Tools?
            </Title>
            <Stack gap="md">
              <Text c="dimmed" ta="center">
                O <strong>Ecommerce Tools</strong> é uma plataforma completa de ferramentas gratuitas projetadas para lojistas,
                desenvolvedores e profissionais de e-commerce. Todas as ferramentas funcionam diretamente no navegador,
                sem necessidade de cadastro, download ou instalação.
              </Text>
              <Text c="dimmed" ta="center">
                Se você vende no <strong>Mercado Livre, Shopee, Amazon, Magazine Luiza</strong> ou em sua própria loja virtual,
                nossas ferramentas ajudam a criar códigos de barras, gerar QR Codes profissionais, remover fundos de fotos de produtos,
                contar caracteres para títulos otimizados e acompanhar as tendências de busca dos maiores marketplaces.
              </Text>
              <Text c="dimmed" ta="center">
                Economize tempo e melhore a qualidade dos seus anúncios com ferramentas pensadas para quem vende online.
              </Text>
            </Stack>
          </Box>
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}

