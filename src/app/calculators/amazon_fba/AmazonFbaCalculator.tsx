"use client";

import {
  Accordion,
  Alert,
  Button,
  Group,
  NumberInput,
  Paper,
  Select,
  Space,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrandAmazon,
  IconCalculator,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useState } from "react";

interface Results {
  revenue: number;
  productCost: number;
  amazonCommission: number;
  fbaFee: number;
  shippingToFba: number;
  taxes: number;
  otherCosts: number;
  totalCost: number;
  netProfit: number;
  profitMargin: number;
  roi: number;
}

const AMAZON_CATEGORIES = [
  { value: "custom", label: "Personalizada" },
  { value: "8", label: "Alimentos — 8%" },
  { value: "10", label: "Automotivo — 10%" },
  { value: "13", label: "Bebê — 13%" },
  { value: "15", label: "Beleza — 15%" },
  { value: "15_books", label: "Livros — 15%" },
  { value: "10_electronics", label: "Eletrônicos — 10%" },
  { value: "13_home", label: "Casa e Cozinha — 13%" },
  { value: "15_sports", label: "Esportes — 15%" },
  { value: "17", label: "Moda e Acessórios — 17%" },
  { value: "15_health", label: "Saúde — 15%" },
  { value: "15_tools", label: "Ferramentas — 15%" },
  { value: "12", label: "Informática — 12%" },
  { value: "15_toys", label: "Brinquedos — 15%" },
  { value: "15_pet", label: "Pet Shop — 15%" },
];

function getCategoryRate(value: string): number {
  if (value === "custom") return 15;
  const num = parseInt(value, 10);
  return isNaN(num) ? 15 : num;
}

export function AmazonFbaCalculator() {
  const [salePrice, setSalePrice] = useState<number | string>("");
  const [productCost, setProductCost] = useState<number | string>("");
  const [category, setCategory] = useState<string>("custom");
  const [commissionRate, setCommissionRate] = useState<number | string>(15);
  const [fbaFee, setFbaFee] = useState<number | string>("");
  const [shippingToFba, setShippingToFba] = useState<number | string>(0);
  const [taxRate, setTaxRate] = useState<number | string>(0);
  const [otherCosts, setOtherCosts] = useState<number | string>(0);
  const [results, setResults] = useState<Results | null>(null);

  const handleCategoryChange = (value: string | null) => {
    if (!value) return;
    setCategory(value);
    if (value !== "custom") {
      setCommissionRate(getCategoryRate(value));
    }
  };

  const calculate = () => {
    const price = Number(salePrice) || 0;
    const cost = Number(productCost) || 0;
    const commission = Number(commissionRate) || 0;
    const fba = Number(fbaFee) || 0;
    const shipping = Number(shippingToFba) || 0;
    const tax = Number(taxRate) || 0;
    const other = Number(otherCosts) || 0;

    const amazonCommission = price * (commission / 100);
    const taxes = price * (tax / 100);
    const totalCost = cost + amazonCommission + fba + shipping + taxes + other;
    const netProfit = price - totalCost;
    const profitMargin = price > 0 ? (netProfit / price) * 100 : 0;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

    setResults({
      revenue: price,
      productCost: cost,
      amazonCommission,
      fbaFee: fba,
      shippingToFba: shipping,
      taxes,
      otherCosts: other,
      totalCost,
      netProfit,
      profitMargin,
      roi,
    });
  };

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Stack gap="lg" maw={800} mx="auto" py="xl">
      <Group gap="sm">
        <IconBrandAmazon size={32} color="var(--mantine-color-teal-5)" />
        <Title order={1}>Calculadora FBA Amazon</Title>
      </Group>
      <Text c="dimmed">
        Estime os custos e o lucro líquido de vender com Fulfillment by Amazon
        (FBA). Selecione a categoria do produto para preencher a comissão
        automaticamente ou defina um valor personalizado. Calcule ROI, margem e
        veja se seu produto é rentável na Amazon Brasil.
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Title order={3} size="h4">
            Dados do Produto
          </Title>
          <Group grow>
            <NumberInput
              label="Preço de Venda na Amazon"
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
              label="Custo do Produto (CMV)"
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

          <Title order={3} size="h4" mt="sm">
            Taxas Amazon
          </Title>
          <Select
            label="Categoria do Produto"
            description="Selecione a categoria para preencher a comissão automaticamente"
            data={AMAZON_CATEGORIES}
            value={category}
            onChange={handleCategoryChange}
          />
          <Group grow>
            <NumberInput
              label="Comissão Amazon (%)"
              placeholder="15"
              suffix="%"
              decimalScale={2}
              min={0}
              max={100}
              value={commissionRate}
              onChange={(v) => {
                setCommissionRate(v);
                setCategory("custom");
              }}
              description="Editável — ajuste conforme sua categoria real"
            />
            <NumberInput
              label="Taxa FBA por Unidade"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={fbaFee}
              onChange={setFbaFee}
              thousandSeparator="."
              decimalSeparator=","
              description="Custo de fulfillment (armazenagem + envio)"
            />
          </Group>

          <Title order={3} size="h4" mt="sm">
            Outros Custos
          </Title>
          <Group grow>
            <NumberInput
              label="Custo de Envio para FBA"
              placeholder="0,00"
              prefix="R$ "
              decimalScale={2}
              min={0}
              value={shippingToFba}
              onChange={setShippingToFba}
              thousandSeparator="."
              decimalSeparator=","
              description="Frete até o centro de distribuição Amazon"
            />
            <NumberInput
              label="Impostos (%)"
              placeholder="0"
              suffix="%"
              decimalScale={2}
              min={0}
              max={100}
              value={taxRate}
              onChange={setTaxRate}
            />
          </Group>
          <NumberInput
            label="Outros Custos (embalagem, etc.)"
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

          <Button
            color="teal"
            size="md"
            onClick={calculate}
            leftSection={<IconCalculator size={20} />}
          >
            Calcular Lucro FBA
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
              Com os valores informados, este produto não é lucrativo via FBA.
              Considere renegociar custos, ajustar o preço ou avaliar o
              fulfillment próprio.
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
                <Table.Td>Comissão Amazon</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.amazonCommission)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Taxa FBA</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.fbaFee)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Envio para FBA</Table.Td>
                <Table.Td ta="right" c="red">
                  - {fmt(results.shippingToFba)}
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
              <Table.Tr
                style={{
                  borderTop: "2px solid var(--mantine-color-dark-4)",
                }}
              >
                <Table.Td fw={700}>Custo Total</Table.Td>
                <Table.Td ta="right" fw={700} c="red">
                  - {fmt(results.totalCost)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr
                style={{
                  borderTop: "2px solid var(--mantine-color-dark-4)",
                }}
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
              <Table.Tr>
                <Table.Td fw={700} fz="lg">
                  ROI
                </Table.Td>
                <Table.Td
                  ta="right"
                  fw={700}
                  fz="lg"
                  c={results.roi >= 0 ? "teal" : "red"}
                >
                  {results.roi.toFixed(2)}%
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Paper>
      )}

      <Space h="md" />

      <Title order={2} size="h3" mb="md">
        Como funciona o FBA da Amazon?
      </Title>
      <Text c="dimmed" mb="md">
        O Fulfillment by Amazon (FBA) é um programa onde a Amazon armazena,
        embala e envia seus produtos para os clientes. Em troca, a Amazon cobra
        uma taxa de fulfillment por unidade vendida e uma comissão percentual
        sobre o preço de venda que varia conforme a categoria do produto.
      </Text>
      <Text c="dimmed" mb="sm">
        As principais taxas do FBA incluem:
      </Text>
      <Text c="dimmed" mb="xs">
        • <strong>Comissão por categoria</strong>: varia de 8% a 17% dependendo
        do tipo de produto
      </Text>
      <Text c="dimmed" mb="xs">
        • <strong>Taxa de fulfillment</strong>: custo de armazenagem, picking,
        embalagem e envio por unidade
      </Text>
      <Text c="dimmed" mb="md">
        • <strong>Custo de envio ao CD</strong>: frete para enviar seus produtos
        ao centro de distribuição da Amazon
      </Text>

      <Title order={2} size="h3" mb="md">
        Perguntas Frequentes
      </Title>
      <Accordion variant="separated">
        <Accordion.Item value="o-que-e-fba">
          <Accordion.Control>O que é o FBA da Amazon?</Accordion.Control>
          <Accordion.Panel>
            FBA (Fulfillment by Amazon) é o serviço de logística da Amazon onde
            ela armazena seus produtos em seus centros de distribuição e cuida de
            todo o processo de envio, embalagem e atendimento ao cliente. Isso
            torna seus produtos elegíveis para o frete Prime.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="comissao-amazon">
          <Accordion.Control>
            Como funcionam as comissões da Amazon Brasil?
          </Accordion.Control>
          <Accordion.Panel>
            A Amazon cobra uma comissão percentual sobre o preço de venda de cada
            produto. Essa comissão varia por categoria, indo de{" "}
            <strong>8% (Alimentos)</strong> até{" "}
            <strong>17% (Moda e Acessórios)</strong>. A maioria das categorias
            fica entre 12% e 15%. Use nossa calculadora para simular com os
            valores exatos da sua categoria.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="vale-a-pena-fba">
          <Accordion.Control>
            Vale a pena usar o FBA Amazon?
          </Accordion.Control>
          <Accordion.Panel>
            O FBA vale a pena quando o volume de vendas justifica os custos
            adicionais e quando a elegibilidade ao Prime gera aumento
            significativo nas vendas. Produtos leves, compactos e com boas
            margens tendem a ser os mais lucrativos no FBA. Use esta calculadora
            para comparar o cenário FBA vs. fulfillment próprio.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="roi">
          <Accordion.Control>O que é ROI?</Accordion.Control>
          <Accordion.Panel>
            ROI (Return on Investment) é o retorno sobre o investimento. Ele
            mostra quanto você ganha em relação ao que investiu. Um ROI de 50%
            significa que para cada R$1,00 investido, você lucra R$0,50. Na
            calculadora, o ROI é calculado como:{" "}
            <strong>(Lucro Líquido / Custo Total) × 100</strong>.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="gratuita">
          <Accordion.Control>A ferramenta é gratuita?</Accordion.Control>
          <Accordion.Panel>
            Sim! A Calculadora FBA Amazon é <strong>100% gratuita</strong>, sem
            necessidade de cadastro ou instalação. Basta preencher os campos e
            calcular.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Space h="xl" />
    </Stack>
  );
}
