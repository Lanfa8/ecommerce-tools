'use client';

import { AppShell, Box, Button, Center, Group, Title } from "@mantine/core";
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
              alt="ecommerce tools logo"
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
      </AppShell.Main>
    </AppShell>
  );
}

