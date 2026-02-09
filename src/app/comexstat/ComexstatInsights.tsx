"use client";

import { useMemo } from 'react';
import {
  Paper,
  Grid,
  Text,
  Group,
  Stack,
  Progress,
  Table,
  SimpleGrid,
  Card,
  ThemeIcon,
  Badge,
  Tabs,
  ScrollArea,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { 
  IconCurrencyDollar, 
  IconScale, 
  IconTruck, 
  IconShield,
  IconMapPin,
  IconCalendar,
  IconWorld,
  IconTrendingUp,
  IconInfoCircle,
} from '@tabler/icons-react';
import { ComexstatDataItem } from './types';
import { 
  calculateTotals, 
  aggregateByState, 
  aggregateByMonth, 
  aggregateByCountry,
  formatCurrency, 
  formatWeight, 
  formatPercentage,
  getMonthName, 
} from './utils';

interface ComexstatInsightsProps {
  data: ComexstatDataItem[];
}

export function ComexstatInsights({ data }: ComexstatInsightsProps) {
  const totals = useMemo(() => calculateTotals(data), [data]);
  const stateAggregation = useMemo(() => aggregateByState(data), [data]);
  const monthAggregation = useMemo(() => aggregateByMonth(data), [data]);
  const countryAggregation = useMemo(() => aggregateByCountry(data), [data]);

  if (!data || data.length === 0) {
    return null;
  }

  // Determina o NCM principal
  const ncmInfo = data[0]?.ncm || 'N/A';
  const ncmCode = data[0]?.coNcm || 'N/A';

  return (
    <Stack gap="lg">
      {/* Header com informações do NCM */}
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Text size="sm" c="dimmed">NCM Consultado</Text>
            <Group>
              <Badge size="lg" variant="filled" color="teal">{ncmCode}</Badge>
              <Text fw={500}>{ncmInfo}</Text>
            </Group>
          </Stack>
          <Badge size="lg" variant="light" color="blue">
            {data.length} registros
          </Badge>
        </Group>
      </Paper>

      {/* Cards de Métricas Principais */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <Text size="sm" c="dimmed">Total FOB</Text>
              <Tooltip
                label="Free On Board: Valor da mercadoria no porto de origem, sem incluir frete e seguro internacional."
                multiline
                w={250}
                withArrow
                position="top"
              >
                <ActionIcon variant="subtle" color="gray" size="xs">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <ThemeIcon color="green" variant="light" size="lg">
              <IconCurrencyDollar size={20} />
            </ThemeIcon>
          </Group>
          <Text fw={700} size="xl">{formatCurrency(totals.totalFOB)}</Text>
          <Text size="xs" c="dimmed" mt="xs">
            Média: {formatCurrency(totals.avgFOBPerKG)}/kg
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <Text size="sm" c="dimmed">Total CIF</Text>
              <Tooltip
                label="Cost, Insurance and Freight: Valor total incluindo custo da mercadoria, seguro e frete até o porto de destino."
                multiline
                w={250}
                withArrow
                position="top"
              >
                <ActionIcon variant="subtle" color="gray" size="xs">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <ThemeIcon color="blue" variant="light" size="lg">
              <IconCurrencyDollar size={20} />
            </ThemeIcon>
          </Group>
          <Text fw={700} size="xl">{formatCurrency(totals.totalCIF)}</Text>
          <Text size="xs" c="dimmed" mt="xs">
            +{formatPercentage(((totals.totalCIF - totals.totalFOB) / totals.totalFOB) * 100)} vs FOB
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <Text size="sm" c="dimmed">Peso Total</Text>
              <Tooltip
                label="Peso líquido total em quilogramas de todas as mercadorias importadas no período consultado."
                multiline
                w={250}
                withArrow
                position="top"
              >
                <ActionIcon variant="subtle" color="gray" size="xs">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <ThemeIcon color="orange" variant="light" size="lg">
              <IconScale size={20} />
            </ThemeIcon>
          </Group>
          <Text fw={700} size="xl">{formatWeight(totals.totalKG)}</Text>
          <Text size="xs" c="dimmed" mt="xs">
            {data.length} operações
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <Text size="sm" c="dimmed">Frete + Seguro</Text>
              <Tooltip
                label="Soma dos custos de transporte internacional (frete) e seguro da carga. É a diferença entre CIF e FOB."
                multiline
                w={250}
                withArrow
                position="top"
              >
                <ActionIcon variant="subtle" color="gray" size="xs">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <ThemeIcon color="red" variant="light" size="lg">
              <IconTruck size={20} />
            </ThemeIcon>
          </Group>
          <Text fw={700} size="xl">{formatCurrency(totals.totalFreight + totals.totalInsurance)}</Text>
          <Text size="xs" c="dimmed" mt="xs">
            {formatCurrency(totals.avgFreightPerKG)}/kg
          </Text>
        </Card>
      </SimpleGrid>

      {/* Tabs de Agregações */}
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Tabs defaultValue="state">
          <Tabs.List>
            <Tabs.Tab value="state" leftSection={<IconMapPin size={16} />}>
              Por Estado
            </Tabs.Tab>
            <Tabs.Tab value="month" leftSection={<IconCalendar size={16} />}>
              Por Mês
            </Tabs.Tab>
            <Tabs.Tab value="country" leftSection={<IconWorld size={16} />}>
              Por País
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="state" pt="md">
            <ScrollArea h={400}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Estado</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>FOB (USD)</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Peso (KG)</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Participação</Table.Th>
                    <Table.Th style={{ width: '20%' }}>Proporção</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {stateAggregation.map((item) => (
                    <Table.Tr key={item.state}>
                      <Table.Td fw={500}>{item.state}</Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatCurrency(item.totalFOB)}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatWeight(item.totalKG)}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatPercentage(item.percentage)}
                      </Table.Td>
                      <Table.Td>
                        <Progress value={item.percentage} color="teal" size="sm" />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="month" pt="md">
            <ScrollArea h={400}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Período</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>FOB (USD)</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>CIF (USD)</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Peso (KG)</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {monthAggregation.map((item) => (
                    <Table.Tr key={`${item.year}-${item.month}`}>
                      <Table.Td fw={500}>{getMonthName(item.month)}/{item.year}</Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatCurrency(item.totalFOB)}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatCurrency(item.totalCIF)}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatWeight(item.totalKG)}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="country" pt="md">
            <ScrollArea h={400}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>País</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>FOB (USD)</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Peso (KG)</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Participação</Table.Th>
                    <Table.Th style={{ width: '20%' }}>Proporção</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {countryAggregation.map((item) => (
                    <Table.Tr key={item.country}>
                      <Table.Td fw={500}>{item.country}</Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatCurrency(item.totalFOB)}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatWeight(item.totalKG)}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatPercentage(item.percentage)}
                      </Table.Td>
                      <Table.Td>
                        <Progress value={item.percentage} color="blue" size="sm" />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Stack>
  );
}
