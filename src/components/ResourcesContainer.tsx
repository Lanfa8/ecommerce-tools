'use client';

import { Button, Card, Center, Container, Flex, Space, Text, Title } from "@mantine/core";
import Link from "next/link";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export default function ResourcesContainer() {
  return (
    <Container fluid>
      <Center>
        <Title order={2} id="recursos">Recursos</Title>
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
          <Title order={3} size="h4">Gerador de EAN/GTIN-13</Title>
          <Space h="xs" />
          <Text size="sm" c="dimmed" >
            O Gerador de EAN/GTIN-13 é uma ferramenta que cria códigos de barras válidos no padrão EAN-13, amplamente utilizado no varejo e em e-commerces. 
            Ele é ideal para testes de sistemas, catálogos de produtos e integrações com plataformas de vendas. 
          </Text>
          <Space h="md" />
          
          <Button 
            fullWidth 
            color="teal" 
            component={Link} 
            href="/generate_gtin"
          >
            Conferir &nbsp;&nbsp;<IconArrowNarrowRight size={20} />
          </Button>
        </Card>
        <Card 
          shadow="sm" 
          padding="lg" 
          radius="md"
          w={{ base: '100%', sm: '45%'  }}
          display={"block"}
          withBorder
        >
          <Title order={3} size="h4">Removedor de Fundo de Imagens</Title>
          <Space h="xs" />
          <Text size="sm" c="dimmed" >
            A ferramenta de Remoção de Fundo de Imagens permite que você elimine o fundo de qualquer imagem de forma rápida e eficiente. 
            Ideal para e-commerce, marketing e design gráfico, ela facilita a criação de imagens com fundo transparente para diversas aplicações.
          </Text>
          <Space h="md" />
          <Button 
            fullWidth 
            color="teal" 
            component={Link} 
            href="/images/remove_background"
          >
            Conferir &nbsp;&nbsp;<IconArrowNarrowRight size={20} />
          </Button>
        </Card>
      </Flex>
    </Container>
  )
}