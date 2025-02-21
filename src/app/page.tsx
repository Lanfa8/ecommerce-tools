'use client';

import { Anchor, AppShell, Box, Button, Card, Center, Container, Flex, Group, Space, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from './logo.png';
import { motion } from "framer-motion";
import { IconArrowDown, IconArrowNarrowRight, IconArrowRight } from "@tabler/icons-react";
import { useRouter } from 'next/navigation';

export default function Home() {
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
                alt="ecommerce tools logo"
                />
            </Link>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Center h={"70vh"}>
            <Box w={"50%"} >
              <Title size={60} textWrap="pretty" style={{textAlign:"center"}}>Todas ferramentas que você precisa para testar e potencializar seu <Box component="span" c="teal" fw={700}>e-commerce</Box></Title>
            </Box>
          </Center>
          <Center h={"30vh"}>
            <ScrollDown targetId="recursos" />
          </Center>
          <ResourcesContainer />
        </AppShell.Main>
      </AppShell>
  );
}

function ResourcesContainer() {
  const router = useRouter();

  return (
    <Container fluid>
      <Center>
        <Title id="recursos">Recursos</Title>
      </Center>
      <Space h="lg" />
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={"space-around"}
      >
        <Card 
          shadow="sm" 
          padding="lg" 
          radius="md"
          w={{ base: '100%', sm: '45%'  }}
          display={"block"}
          withBorder
        >
          <Text fw={500}>Gerador de EAN/GTIN-13</Text>
          <Text size="sm" c="dimmed" >
            O Gerador de EAN/GTIN-13 é uma ferramenta que cria códigos de barras válidos no padrão EAN-13, amplamente utilizado no varejo e em e-commerces. 
            Ele é ideal para testes de sistemas, catálogos de produtos e integrações com plataformas de vendas. 
          </Text>
          <Space h="md" />
          <Button fullWidth color="teal" onClick={() => router.push("/generate_gtin")}>
            Conferir &nbsp;&nbsp;<IconArrowNarrowRight size={20} />
          </Button>
        </Card>
      </Flex>
    </Container>
  )
}

function ScrollDown({ targetId }: { targetId: string }) {
  const scrollToComponent = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return <>
    <motion.div
      whileHover={{ scale: 1.2 }}
      animate={{ y: [0, 10, 0] }} // Bouncing effect
      transition={{ repeat: Infinity, duration: 1.2 }}
    >
      <Anchor component="button" onClick={scrollToComponent} underline="always">
        <IconArrowDown size={48} color="var(--mantine-color-teal-5)"/>
      </Anchor>
    </motion.div> 
  </>
}