'use client';  

import { AppShell, Box, Center, Group, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from './logo.png';
import ScrollDownButton from "@/components/ScrollDownButton";
import ResourcesContainer from "@/components/ResourcesContainer";

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
              <Title order={1} size={60} textWrap="pretty" style={{textAlign:"center"}}>
                Todas ferramentas que você precisa para testar e potencializar seu <Box component="span" c="teal" fw={700}>e-commerce</Box>
              </Title>
            </Box>
          </Center>
          <Center h={"30vh"}>
            <ScrollDownButton targetId="recursos" />
          </Center>
          <ResourcesContainer />
        </AppShell.Main>
      </AppShell>
  );
}

