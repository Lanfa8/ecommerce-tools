"use client";

import {
  Accordion,
  Alert,
  Button,
  Group,
  NumberInput,
  Paper,
  Space,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  IconReceipt,
  IconCalculator,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useState } from "react";

interface Results {
  suggestedPrice: number;
  platformFee: number;
  taxes: number;
  totalCost: number;
  profitPerUnit: number;
  realMargin: number;
  productCost: number;
  shippingCost: number;
  otherCosts: number;
}

export function ProductPricingCalculator() {
  const [productCost, setProductCost] = useState<number | string>("");
  const [desiredMargin, setDesiredMargin] = useState<number | string>("");
  const [platformRate, setPlatformRate] = useState<number | string>(15);
  const [taxRate, setTaxRate] = useState<number | string>(0);
  const [shippingCost, setShippingCost] = useState<number | string>(0);
  const [otherCosts, setOtherCosts] = useState<number | string>(0);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const cost = Number(productCost) || 0;
    const margin = Number(desiredMargin) || 0;
    const platform = Number(platformRate) || 0;
    const tax = Number(taxRate) || 0;
    const shipping = Number(shippingCost) || 0;
    const other = Number(otherCosts) || 0;

    const totalPercentage = margin + platform + tax;

    if (totalPercentage >= 100) {
      setError(
        "A soma da margem desejada + taxa da plataforma + impostos é igual ou superior a 100%. Essa combinação é impossível — ajuste os valores."
      );
      setResults(null);
      return;
    }

    setError(null);

    const fixedCosts = cost + shipping + other;
    const suggestedPrice = fixedCosts / (1 - totalPercentage / 100);
    const platformFee = suggestedPrice * (platform / 100);
    const taxes = suggestedPrice * (tax / 100);
    const totalCost = cost + shipping + other + platformFee + taxes;
    const profitPerUnit = suggestedPrice - totalCost;
    const realMargin =
      suggestedPrice > 0 ? (profitPerUnit / suggestedPrice) * 100 : 0;

    setResults({
      suggestedPrice,
      platformFee,
      taxes,
      totalCost,
      profitPerUnit,
      realMargin,
      productCost: cost,
      shippingCost: shipping,
      otherCosts: other,
    });
  };

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Stack gap="lg" maw={800} mx="auto" py="xl">
      <Group gap="sm">
        <IconReceipt size={32} color="var(--mantine-color-teal-5)" />
        <Title order={1}>Calculadora de Precificação</Title>
      </Group>
      <Text c="dimmed">
        Calcule o preço de venda ideal para seus produtos com base no custo, na
        margem de lucro desejada, nas taxas do marketplace e nos impostos. Nunca
        mais precifique no chute — use a fórmula de markup reverso para garantir
        a margem que você precisa.
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Title order={3} size="h4">
            Custos do Produto
          </Title>
          <Group grow>
            <NumberInput
              label="Custo do Produto (CMV)"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={productCost}
              onChange={setProductCost}
              thousandSeparator="."
              decimalSeparator=","
              description="Custo de aquisição ou produção"
            />
            <NumberInput
              label="Custo de Envio por Unidade"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={shippingCost}
              onChange={setShippingCost}
              thousandSeparator="."
              decimalSeparator=","
            />
          </Group>
          <NumberInput
            label="Outros Custos por Unidade (embalagem, marketing...)"
            placeholder="0,00"
            prefix="R$ "
            decimalScale={2}
            min={0}
            value={otherCosts}
            onChange={setOtherCosts}
            thousandSeparator="."
            decimalSeparator=","
            w={{ base: "100%", sm: "49%" }}
          />

          <Title order={3} size="h4" mt="sm">
            Margem e Taxas
          </Title>
          <Group grow>
            <NumberInput
              label="Margem de Lucro Desejada (%)"
              placeholder="20"
              suffix="%"
              decimalScale={2}
              min={0}
              max={99}
              value={desiredMargin}
              onChange={setDesiredMargin}
              description="Margem sobre o preço de venda"
            />
            <NumberInput
              label="Taxa da Plataforma / Marketplace (%)"
              placeholder="15"
              suffix="%"
              decimalScale={2}
              min={0}
              max={99}
              value={platformRate}
              onChange={setPlatformRate}
              description="Ex: 15% Mercado Livre, 20% Shopee"
            />
          </Group>
          <NumberInput
            label="Impostos (%)"
            placeholder="0"
            suffix="%"
            decimalScale={2}
            min={0}
            max={99}
            value={taxRate}
            onChange={setTaxRate}
            description="Impostos sobre a NF/venda"
            w={{ base: "100%", sm: "49%" }}
          />

          <Button
            color="teal"
            size="md"
            onClick={calculate}
            leftSection={<IconCalculator size={20} />}
          >
            Calcular Preço de Venda
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Alert
          icon={<IconAlertTriangle size={20} />}
          title="Combinação Impossível"
          color="red"
        >
          {error}
        </Alert>
      )}

      {results && (
        <Paper withBorder p="lg" radius="md">
          <Title order={3} mb="md">
            Resultado
          </Title>

          <Table striped highlightOnHover withTableBorder>
            <Table.Tbody>
              <Table.Tr
                style={{
                  borderBottom: "2px solid var(--mantine-color-dark-4)",
                }}
              >
                <Table.Td fw={700} fz="lg">
                  💰 Preço de Venda Sugerido
                </Table.Td>
                <Table.Td ta="right" fw={700} fz="xl" c="teal">
                  {fmt(results.suggestedPrice)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Custo do Produto</Table.Td>
                <Table.Td ta="right" fw={500}>
                  {fmt(results.productCost)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Custo de Envio</Table.Td>
                <Table.Td ta="right" fw={500}>
                  {fmt(results.shippingCost)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Outros Custos</Table.Td>
                <Table.Td ta="right" fw={500}>
                  {fmt(results.otherCosts)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Taxa da Plataforma</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.platformFee)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Impostos</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.taxes)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr
                style={{
                  borderTop: "2px solid var(--mantine-color-dark-4)",
                }}
              >
                <Table.Td fw={700}>Custo Total</Table.Td>
                <Table.Td ta="right" fw={700} c="red">
                  {fmt(results.totalCost)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr
                style={{
                  borderTop: "2px solid var(--mantine-color-dark-4)",
                }}
              >
                <Table.Td fw={700} fz="lg">
                  Lucro por Unidade
                </Table.Td>
                <Table.Td
                  ta="right"
                  fw={700}
                  fz="lg"
                  c={results.profitPerUnit >= 0 ? "teal" : "red"}
                >
                  {fmt(results.profitPerUnit)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700} fz="lg">
                  Margem Real
                </Table.Td>
                <Table.Td
                  ta="right"
                  fw={700}
                  fz="lg"
                  c={results.realMargin >= 0 ? "teal" : "red"}
                >
                  {results.realMargin.toFixed(2)}%
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Paper>
      )}

      <Space h="md" />

      <Title order={2} size="h3" mb="md">
        Como funciona a precificação por markup reverso?
      </Title>
      <Text c="dimmed" mb="md">
        A fórmula de markup reverso calcula o preço de venda a partir dos custos,
        garantindo que a margem de lucro desejada seja mantida mesmo após descontar
        todas as taxas e impostos. A fórmula é:
      </Text>
      <Paper withBorder p="md" radius="md" mb="md">
        <Text ta="center" fw={700} fz="lg" ff="monospace">
          Preço = (Custos Fixos) ÷ (1 − Margem% − Taxa% − Impostos%)
        </Text>
      </Paper>
      <Text c="dimmed" mb="md">
        Diferente do markup tradicional (que aplica um percentual sobre o custo),
        o markup reverso garante que a margem seja calculada sobre o preço de
        venda — que é como os marketplaces cobram suas comissões. Isso evita o
        erro comum de precificar com uma margem menor do que a esperada.
      </Text>

      <Title order={2} size="h3" mb="md">
        Perguntas Frequentes
      </Title>
      <Accordion variant="separated">
        <Accordion.Item value="o-que-e">
          <Accordion.Control>
            O que é a calculadora de precificação?
          </Accordion.Control>
          <Accordion.Panel>
            É uma ferramenta que calcula o preço de venda ideal para seus
            produtos com base no custo, margem de lucro desejada, comissão do
            marketplace e impostos. Ela garante que você atinja a margem
            exata que precisa, sem surpresas.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="markup-vs-margem">
          <Accordion.Control>
            Qual a diferença entre markup e margem de lucro?
          </Accordion.Control>
          <Accordion.Panel>
            O <strong>markup</strong> é calculado sobre o custo do produto
            (exemplo: custo R$50 + 100% markup = R$100). Já a{" "}
            <strong>margem</strong> é calculada sobre o preço de venda (exemplo:
            preço R$100, custo R$50 = margem de 50%). Marketplaces cobram
            comissão sobre o preço de venda, então usar a margem é mais
            preciso para precificação de e-commerce.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="taxa-marketplace">
          <Accordion.Control>
            Quais são as taxas dos principais marketplaces?
          </Accordion.Control>
          <Accordion.Panel>
            As comissões variam por plataforma e categoria:
            <br />• <strong>Mercado Livre</strong>: 11% a 19%
            <br />• <strong>Shopee</strong>: 14% a 20%
            <br />• <strong>Amazon</strong>: 8% a 17%
            <br />• <strong>Magazine Luiza</strong>: 12% a 20%
            <br />
            Use a calculadora para simular com a taxa exata do seu canal de
            vendas.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="margem-ideal">
          <Accordion.Control>
            Qual margem de lucro devo usar?
          </Accordion.Control>
          <Accordion.Panel>
            A margem ideal depende do seu nicho e modelo de negócio. No
            e-commerce brasileiro, margens líquidas entre{" "}
            <strong>15% e 30%</strong> são consideradas saudáveis. Produtos
            commoditizados podem ter margens de 10-15%, enquanto produtos de
            nicho ou com marca própria podem atingir 30-50%.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="gratuita">
          <Accordion.Control>A ferramenta é gratuita?</Accordion.Control>
          <Accordion.Panel>
            Sim! A Calculadora de Precificação é{" "}
            <strong>100% gratuita</strong>, sem necessidade de cadastro ou
            instalação. Simule quantos cenários quiser.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Space h="xl" />
    </Stack>
  );
}
