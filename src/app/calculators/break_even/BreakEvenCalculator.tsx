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
  IconScale,
  IconCalculator,
  IconAlertTriangle,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useState } from "react";

interface Results {
  contributionMargin: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  salePricePerUnit: number;
  variableCostPerUnit: number;
  fixedCosts: number;
}

export function BreakEvenCalculator() {
  const [salePrice, setSalePrice] = useState<number | string>("");
  const [variableCost, setVariableCost] = useState<number | string>("");
  const [fixedCosts, setFixedCosts] = useState<number | string>("");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const price = Number(salePrice) || 0;
    const variable = Number(variableCost) || 0;
    const fixed = Number(fixedCosts) || 0;

    const contributionMargin = price - variable;

    if (contributionMargin <= 0) {
      setError(
        "O preço de venda não cobre os custos variáveis. A margem de contribuição é negativa ou zero. Ajuste seus preços antes de calcular o ponto de equilíbrio."
      );
      setResults(null);
      return;
    }

    setError(null);

    const breakEvenUnits = Math.ceil(fixed / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * price;

    setResults({
      contributionMargin,
      breakEvenUnits,
      breakEvenRevenue,
      salePricePerUnit: price,
      variableCostPerUnit: variable,
      fixedCosts: fixed,
    });
  };

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Stack gap="lg" maw={800} mx="auto" py="xl">
      <Group gap="sm">
        <IconScale size={32} color="var(--mantine-color-teal-5)" />
        <Title order={1}>Calculadora de Ponto de Equilíbrio</Title>
      </Group>
      <Text c="dimmed">
        Descubra quantas unidades você precisa vender por mês para cobrir todos
        os custos fixos e variáveis do seu e-commerce. O ponto de equilíbrio
        (break even) é o momento em que a receita iguala os custos totais — a
        partir dele, cada venda adicional gera lucro.
      </Text>

      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Title order={3} size="h4">
            Dados para o Cálculo
          </Title>

          <NumberInput
            label="Preço de Venda por Unidade"
            placeholder="0,00"
            prefix="R$ "
            decimalScale={2}
            min={0}
            value={salePrice}
            onChange={setSalePrice}
            thousandSeparator="."
            decimalSeparator=","
            description="Quanto você cobra por unidade vendida"
          />

          <NumberInput
            label="Custo Variável por Unidade"
            placeholder="0,00"
            prefix="R$ "
            decimalScale={2}
            min={0}
            value={variableCost}
            onChange={setVariableCost}
            thousandSeparator="."
            decimalSeparator=","
            description="Custo do produto + frete + comissão por unidade"
          />

          <NumberInput
            label="Custos Fixos Mensais"
            placeholder="0,00"
            prefix="R$ "
            decimalScale={2}
            min={0}
            value={fixedCosts}
            onChange={setFixedCosts}
            thousandSeparator="."
            decimalSeparator=","
            description="Aluguel, salários, plataforma, marketing fixo, etc."
          />

          <Button
            color="teal"
            size="md"
            onClick={calculate}
            leftSection={<IconCalculator size={20} />}
          >
            Calcular Ponto de Equilíbrio
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Alert
          icon={<IconAlertTriangle size={20} />}
          title="Margem de Contribuição Insuficiente"
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

          <Alert
            icon={<IconInfoCircle size={20} />}
            color="teal"
            mb="md"
          >
            Você precisa vender pelo menos{" "}
            <strong>{results.breakEvenUnits} unidades por mês</strong> para
            cobrir todos os seus custos e atingir o ponto de equilíbrio.
          </Alert>

          <Table striped highlightOnHover withTableBorder>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Preço de Venda por Unidade</Table.Td>
                <Table.Td ta="right" fw={500}>
                  {fmt(results.salePricePerUnit)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Custo Variável por Unidade</Table.Td>
                <Table.Td ta="right" fw={500}>
                  {fmt(results.variableCostPerUnit)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Custos Fixos Mensais</Table.Td>
                <Table.Td ta="right" fw={500}>
                  {fmt(results.fixedCosts)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr
                style={{
                  borderTop: "2px solid var(--mantine-color-dark-4)",
                }}
              >
                <Table.Td fw={700}>Margem de Contribuição</Table.Td>
                <Table.Td ta="right" fw={700} c="teal">
                  {fmt(results.contributionMargin)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr
                style={{
                  borderTop: "2px solid var(--mantine-color-dark-4)",
                }}
              >
                <Table.Td fw={700} fz="lg">
                  Ponto de Equilíbrio (unidades)
                </Table.Td>
                <Table.Td ta="right" fw={700} fz="lg" c="teal">
                  {results.breakEvenUnits} unidades/mês
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={700} fz="lg">
                  Ponto de Equilíbrio (faturamento)
                </Table.Td>
                <Table.Td ta="right" fw={700} fz="lg" c="teal">
                  {fmt(results.breakEvenRevenue)}/mês
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Paper>
      )}

      <Space h="md" />

      <Title order={2} size="h3" mb="md">
        O que é o Ponto de Equilíbrio?
      </Title>
      <Text c="dimmed" mb="md">
        O ponto de equilíbrio (ou break even point) é o momento em que a receita
        total de vendas é exatamente igual aos custos totais (fixos + variáveis).
        Antes desse ponto, a operação está no prejuízo. Depois dele, cada venda
        gera lucro líquido.
      </Text>
      <Text c="dimmed" mb="md">
        A fórmula é simples:{" "}
        <strong>
          Ponto de Equilíbrio = Custos Fixos ÷ (Preço de Venda − Custo Variável)
        </strong>
        . A diferença entre o preço de venda e o custo variável chama-se{" "}
        <strong>margem de contribuição</strong> — é o valor que cada unidade
        vendida contribui para pagar os custos fixos.
      </Text>

      <Title order={2} size="h3" mb="md">
        Perguntas Frequentes
      </Title>
      <Accordion variant="separated">
        <Accordion.Item value="o-que-e">
          <Accordion.Control>
            O que é o ponto de equilíbrio no e-commerce?
          </Accordion.Control>
          <Accordion.Panel>
            É a quantidade mínima de vendas que você precisa fazer para cobrir
            todos os seus custos (fixos e variáveis) sem ter prejuízo nem
            lucro. É um indicador essencial para determinar a viabilidade
            financeira do seu negócio online.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="custos-fixos">
          <Accordion.Control>
            O que são custos fixos e variáveis?
          </Accordion.Control>
          <Accordion.Panel>
            <strong>Custos fixos</strong> são despesas que não mudam com o
            volume de vendas: aluguel, salários, assinatura de plataforma,
            software, marketing fixo mensal.{" "}
            <strong>Custos variáveis</strong> são os que variam por unidade
            vendida: custo do produto, frete, comissão do marketplace,
            embalagem.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="margem-contribuicao">
          <Accordion.Control>
            O que é margem de contribuição?
          </Accordion.Control>
          <Accordion.Panel>
            A margem de contribuição é a diferença entre o preço de venda e o
            custo variável por unidade. Ela representa quanto cada venda
            &quot;contribui&quot; para pagar os custos fixos. Se a margem é de
            R$30, você precisa vender X unidades até que o acumulado cubra
            todos os custos fixos mensais.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="como-reduzir">
          <Accordion.Control>
            Como reduzir o ponto de equilíbrio?
          </Accordion.Control>
          <Accordion.Panel>
            Você pode reduzir o break even de três formas: (1){" "}
            <strong>aumentar o preço de venda</strong>, (2){" "}
            <strong>reduzir os custos variáveis</strong> (negociar com
            fornecedores, otimizar frete), ou (3){" "}
            <strong>reduzir os custos fixos</strong> (renegociar aluguel,
            cortar gastos não essenciais).
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="gratuita">
          <Accordion.Control>A ferramenta é gratuita?</Accordion.Control>
          <Accordion.Panel>
            Sim! A Calculadora de Ponto de Equilíbrio é{" "}
            <strong>100% gratuita</strong>, sem necessidade de cadastro ou
            instalação.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Space h="xl" />
    </Stack>
  );
}
