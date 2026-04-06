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
  IconBrandShopee,
  IconCalculator,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useState } from "react";

interface Results {
  revenue: number;
  productCost: number;
  shippingCost: number;
  shopifyFee: number;
  transactionFee: number;
  taxes: number;
  otherCosts: number;
  totalCost: number;
  netProfit: number;
  profitMargin: number;
}

export function ShopifyProfitCalculator() {
  const [salePrice, setSalePrice] = useState<number | string>("");
  const [productCost, setProductCost] = useState<number | string>("");
  const [shippingCost, setShippingCost] = useState<number | string>(0);
  const [shopifyRate, setShopifyRate] = useState<number | string>(2);
  const [transactionRate, setTransactionRate] = useState<number | string>(1.5);
  const [taxRate, setTaxRate] = useState<number | string>(0);
  const [otherCosts, setOtherCosts] = useState<number | string>(0);
  const [results, setResults] = useState<Results | null>(null);

  const calculate = () => {
    const price = Number(salePrice) || 0;
    const cost = Number(productCost) || 0;
    const shipping = Number(shippingCost) || 0;
    const shopify = Number(shopifyRate) || 0;
    const transaction = Number(transactionRate) || 0;
    const tax = Number(taxRate) || 0;
    const other = Number(otherCosts) || 0;

    const shopifyFee = price * (shopify / 100);
    const transactionFee = price * (transaction / 100);
    const taxes = price * (tax / 100);
    const totalCost = cost + shipping + shopifyFee + transactionFee + taxes + other;
    const netProfit = price - totalCost;
    const profitMargin = price > 0 ? (netProfit / price) * 100 : 0;

    setResults({
      revenue: price,
      productCost: cost,
      shippingCost: shipping,
      shopifyFee,
      transactionFee,
      taxes,
      otherCosts: other,
      totalCost,
      netProfit,
      profitMargin,
    });
  };

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Stack gap="lg" maw={800} mx="auto" py="xl">
      <Group gap="sm">
        <IconBrandShopee size={32} color="var(--mantine-color-teal-5)" />
        <Title order={1}>Calculadora de Lucro Shopify</Title>
      </Group>
      <Text c="dimmed">
        Calcule o lucro líquido e a margem de lucro de cada produto vendido na
        sua loja Shopify. Considere as taxas da plataforma, custo do produto,
        frete, impostos e custos adicionais para saber exatamente quanto você
        ganha por venda.
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Title order={3} size="h4">
            Dados do Produto
          </Title>
          <Group grow>
            <NumberInput
              label="Preço de Venda"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={salePrice}
              onChange={setSalePrice}
              thousandSeparator="."
              decimalSeparator=","
            />
            <NumberInput
              label="Custo do Produto"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={productCost}
              onChange={setProductCost}
              thousandSeparator="."
              decimalSeparator=","
            />
          </Group>
          <Group grow>
            <NumberInput
              label="Custo de Envio"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={shippingCost}
              onChange={setShippingCost}
              thousandSeparator="."
              decimalSeparator=","
            />
            <NumberInput
              label="Outros Custos (embalagem, marketing...)"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={otherCosts}
              onChange={setOtherCosts}
              thousandSeparator="."
              decimalSeparator=","
            />
          </Group>

          <Title order={3} size="h4" mt="sm">
            Taxas e Impostos
          </Title>
          <Group grow>
            <NumberInput
              label="Taxa Shopify (%)"
              placeholder="2"
              suffix="%"
              decimalScale={2}
              min={0}
              max={100}
              value={shopifyRate}
              onChange={setShopifyRate}
              description="Shopify Basic: 2%"
            />
            <NumberInput
              label="Taxa de Transação (%)"
              placeholder="1.5"
              suffix="%"
              decimalScale={2}
              min={0}
              max={100}
              value={transactionRate}
              onChange={setTransactionRate}
              description="0% com Shopify Payments"
            />
          </Group>
          <NumberInput
            label="Impostos (%)"
            placeholder="0"
            suffix="%"
            decimalScale={2}
            min={0}
            max={100}
            value={taxRate}
            onChange={setTaxRate}
            description="Opcional — impostos sobre a venda"
            w={{ base: "100%", sm: "49%" }}
          />

          <Button
            color="teal"
            size="md"
            onClick={calculate}
            leftSection={<IconCalculator size={20} />}
          >
            Calcular Lucro
          </Button>
        </Stack>
      </Paper>

      {results && (
        <Paper withBorder p="lg" radius="md">
          <Title order={3} mb="md">
            Resultado
          </Title>

          {results.netProfit < 0 && (
            <Alert
              icon={<IconAlertTriangle size={20} />}
              title="Operação com Prejuízo"
              color="red"
              mb="md"
            >
              Com os valores informados, você está operando no prejuízo. Revise
              seus custos ou aumente o preço de venda.
            </Alert>
          )}

          <Table striped highlightOnHover withTableBorder>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Receita Bruta</Table.Td>
                <Table.Td ta="right" fw={500}>
                  {fmt(results.revenue)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Custo do Produto</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.productCost)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Custo de Envio</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.shippingCost)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Taxa Shopify</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.shopifyFee)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Taxa de Transação</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.transactionFee)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Impostos</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.taxes)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Outros Custos</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.otherCosts)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr style={{ borderTop: "2px solid var(--mantine-color-dark-4)" }}>
                <Table.Td fw={700}>Custo Total</Table.Td>
                <Table.Td ta="right" fw={700} c="red">
                  - {fmt(results.totalCost)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr
                style={{ borderTop: "2px solid var(--mantine-color-dark-4)" }}
              >
                <Table.Td fw={700} fz="lg">
                  Lucro Líquido
                </Table.Td>
                <Table.Td
                  ta="right"
                  fw={700}
                  fz="lg"
                  c={results.netProfit >= 0 ? "teal" : "red"}
                >
                  {fmt(results.netProfit)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700} fz="lg">
                  Margem de Lucro
                </Table.Td>
                <Table.Td
                  ta="right"
                  fw={700}
                  fz="lg"
                  c={results.profitMargin >= 0 ? "teal" : "red"}
                >
                  {results.profitMargin.toFixed(2)}%
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Paper>
      )}

      <Space h="md" />

      <Title order={2} size="h3" mb="md">
        Como funciona a Calculadora de Lucro Shopify?
      </Title>
      <Text c="dimmed" mb="md">
        A calculadora considera todos os custos envolvidos em uma venda na Shopify:
        o custo do produto, frete, taxas da plataforma (que variam conforme o plano),
        taxa de transação (aplicada quando você não usa o Shopify Payments) e impostos.
        O resultado mostra o lucro líquido real e a margem de lucro por venda.
      </Text>
      <Text c="dimmed" mb="xs">
        • <strong>Shopify Basic</strong>: taxa de 2% por transação
      </Text>
      <Text c="dimmed" mb="xs">
        • <strong>Shopify</strong>: taxa de 1% por transação
      </Text>
      <Text c="dimmed" mb="xs">
        • <strong>Advanced Shopify</strong>: taxa de 0.5% por transação
      </Text>
      <Text c="dimmed" mb="md">
        • <strong>Shopify Payments</strong>: elimina a taxa de transação adicional
      </Text>

      <Title order={2} size="h3" mb="md">
        Perguntas Frequentes
      </Title>
      <Accordion variant="separated">
        <Accordion.Item value="o-que-e">
          <Accordion.Control>
            O que é a calculadora de lucro Shopify?
          </Accordion.Control>
          <Accordion.Panel>
            É uma ferramenta gratuita que calcula o lucro líquido de cada venda
            na Shopify, descontando todos os custos: produto, frete, taxas da
            plataforma, taxas de transação e impostos. Assim você sabe
            exatamente quanto ganha por produto vendido.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="taxas-shopify">
          <Accordion.Control>Quais são as taxas da Shopify?</Accordion.Control>
          <Accordion.Panel>
            A Shopify cobra uma taxa percentual por transação que varia conforme
            o plano: 2% (Basic), 1% (Shopify) e 0,5% (Advanced). Se você usar o
            Shopify Payments como gateway de pagamento, essa taxa adicional é
            eliminada. Além disso, o gateway de pagamento pode cobrar suas
            próprias taxas.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="margem-boa">
          <Accordion.Control>
            Qual é uma boa margem de lucro no Shopify?
          </Accordion.Control>
          <Accordion.Panel>
            A margem ideal varia por nicho, mas no e-commerce uma margem líquida
            entre <strong>15% e 30%</strong> é considerada saudável. Margens
            abaixo de 10% podem indicar que os custos estão altos demais ou o
            preço de venda precisa ser ajustado. Use a calculadora para simular
            diferentes cenários.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="gratuita">
          <Accordion.Control>A ferramenta é gratuita?</Accordion.Control>
          <Accordion.Panel>
            Sim! A Calculadora de Lucro Shopify é{" "}
            <strong>100% gratuita</strong>, sem necessidade de cadastro ou
            instalação. Basta preencher os campos e clicar em calcular.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Space h="xl" />
    </Stack>
  );
}
