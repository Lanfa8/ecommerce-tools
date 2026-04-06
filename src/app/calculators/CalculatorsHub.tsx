"use client";

import {
  Title,
  Text,
  Space,
  Flex,
  Card,
  Button,
  Group,
  Stack,
  Box,
} from "@mantine/core";
import Link from "next/link";
import {
  IconArrowNarrowRight,
  IconBrandShopee,
  IconBrandAmazon,
  IconScale,
  IconReceipt,
  IconCalculator,
} from "@tabler/icons-react";

const calculators = [
  {
    title: "Calculadora de Lucro Shopify",
    description:
      "Calcule o lucro líquido e a margem de lucro das suas vendas na Shopify. Considere taxas da plataforma, custo de envio, impostos e outros custos para saber exatamente quanto você ganha por produto.",
    href: "/calculators/shopify_profit",
    icon: <IconBrandShopee size={28} style={{ display: "inline" }} />,
  },
  {
    title: "Calculadora FBA Amazon",
    description:
      "Estime os custos e o lucro de vender com Fulfillment by Amazon (FBA). Inclui comissão por categoria, taxa de fulfillment, custo de envio ao centro de distribuição e ROI.",
    href: "/calculators/amazon_fba",
    icon: <IconBrandAmazon size={28} style={{ display: "inline" }} />,
  },
  {
    title: "Calculadora Ponto de Equilíbrio",
    description:
      "Descubra quantas unidades você precisa vender para cobrir todos os seus custos fixos e variáveis. Essencial para planejar metas de vendas e viabilidade do seu e-commerce.",
    href: "/calculators/break_even",
    icon: <IconScale size={28} style={{ display: "inline" }} />,
  },
  {
    title: "Calculadora de Precificação",
    description:
      "Calcule o preço de venda ideal a partir do custo do produto, margem desejada, taxas do marketplace e impostos. Nunca mais precifique no chute — use a fórmula correta.",
    href: "/calculators/product_pricing",
    icon: <IconReceipt size={28} style={{ display: "inline" }} />,
  },
];

export function CalculatorsHub() {
  return (
    <Stack gap="lg" py="xl">
      <Group gap="sm">
        <IconCalculator size={36} color="var(--mantine-color-teal-5)" />
        <Title order={1}>Calculadoras para E-commerce</Title>
      </Group>
      <Text c="dimmed" maw={700}>
        Ferramentas de cálculo gratuitas e online para lojistas, vendedores e
        empreendedores digitais. Descubra seu lucro real, encontre o preço de
        venda ideal, calcule o ponto de equilíbrio do seu negócio e estime
        custos do FBA Amazon — tudo sem cadastro e direto no navegador.
      </Text>

      <Space h="md" />

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify="center"
        wrap="wrap"
      >
        {calculators.map((calc) => (
          <Card
            key={calc.href}
            shadow="sm"
            padding="lg"
            radius="md"
            w={{ base: "100%", sm: "45%" }}
            display="block"
            withBorder
          >
            <Flex gap={8}>
              {calc.icon}
              <Title order={3} size="h4">
                {calc.title}
              </Title>
            </Flex>
            <Space h="xs" />
            <Text size="sm" c="dimmed">
              {calc.description}
            </Text>
            <Space h="md" />
            <Button
              fullWidth
              color="teal"
              component={Link}
              href={calc.href}
            >
              Acessar &nbsp;&nbsp;
              <IconArrowNarrowRight size={20} />
            </Button>
          </Card>
        ))}
      </Flex>

      <Space h="xl" />

      <Box>
        <Title order={2} size="h3" mb="md">
          Por que usar nossas calculadoras?
        </Title>
        <Text c="dimmed" mb="sm">
          Precificar produtos de forma errada é um dos maiores erros de quem
          vende online. Muitos lojistas definem preços sem considerar todas as
          taxas, comissões e custos envolvidos — e acabam operando no prejuízo
          sem perceber.
        </Text>
        <Text c="dimmed" mb="sm">
          Nossas calculadoras foram pensadas para vendedores de{" "}
          <strong>Shopify, Amazon, Mercado Livre, Shopee</strong> e lojas
          virtuais próprias. Elas consideram as taxas reais de cada plataforma e
          ajudam você a tomar decisões baseadas em dados.
        </Text>
        <Text c="dimmed">
          Todas as ferramentas são <strong>100% gratuitas</strong>, funcionam
          direto no navegador e não exigem cadastro nem instalação.
        </Text>
      </Box>
    </Stack>
  );
}
