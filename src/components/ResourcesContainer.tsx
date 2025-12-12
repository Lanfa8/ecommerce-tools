'use client';

import { Button, Card, Center, Container, Flex, Space, Text, Title } from "@mantine/core";
import Link from "next/link";
import { IconArrowNarrowRight, IconBarcode, IconImageInPicture, IconQrcode, IconLetterCase, IconTrendingUp } from "@tabler/icons-react";

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
        wrap="wrap"
      >
        <CardWrapper>
          <Flex gap={8}>
            <IconBarcode size={24} style={{ display: "inline" }} />
            <Title order={3} size="h4">Gerador de EAN/GTIN-13</Title>
          </Flex>
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
        </CardWrapper>
        <CardWrapper>
          <Flex gap={8}>
            <IconImageInPicture size={24} style={{ display: "inline" }} />
            <Title order={3} size="h4">Removedor de Fundo de Imagens</Title>
          </Flex>
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
        </CardWrapper>
        <CardWrapper>
          <Flex gap={8}>
            <IconQrcode size={24} style={{ display: "inline" }} />
            <Title order={3} size="h4">Gerador de QR Code</Title>
          </Flex>
          <Space h="xs" />
          <Text size="sm" c="dimmed" >
            Crie QR Codes personalizados com cores, logotipos e estilos diferentes.
            Ferramenta gratuita para gerar QR Codes para links, textos e mais.
          </Text>
          <Space h="md" />
          <Button
            fullWidth
            color="teal"
            component={Link}
            href="/qr_code_generator"
          >
            Conferir &nbsp;&nbsp;<IconArrowNarrowRight size={20} />
          </Button>
        </CardWrapper>
        <CardWrapper>
          <Flex gap={8}>
            <IconLetterCase size={24} style={{ display: "inline" }} />
            <Title order={3} size="h4">Contador de Caracteres</Title>
          </Flex>
          <Space h="xs" />
          <Text size="sm" c="dimmed" >
            Ferramenta simples e gratuita para contar caracteres de um texto.
            Ideal para verificar limites de texto em anúncios e SEO.
          </Text>
          <Space h="md" />
          <Button
            fullWidth
            color="teal"
            component={Link}
            href="/character_counter"
          >
            Conferir &nbsp;&nbsp;<IconArrowNarrowRight size={20} />
          </Button>
        </CardWrapper>
        <CardWrapper>
          <Flex gap={8}>
            <IconTrendingUp size={24} style={{ display: "inline" }} />
            <Title order={3} size="h4">Tendências Mercado Livre</Title>
          </Flex>
          <Space h="xs" />
          <Text size="sm" c="dimmed" >
            Visualize as tendências de busca mais populares no Mercado Livre.
            Descubra o que está em alta e encontre oportunidades de vendas.
          </Text>
          <Space h="md" />
          <Button
            fullWidth
            color="teal"
            component={Link}
            href="/trends/mercadolivre"
          >
            Conferir &nbsp;&nbsp;<IconArrowNarrowRight size={20} />
          </Button>
        </CardWrapper>
      </Flex>
    </Container>
  )
}

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      w={{ base: '100%', sm: '45%' }}
      display={"block"}
      withBorder
    >
      {children}
    </Card>
  )
};