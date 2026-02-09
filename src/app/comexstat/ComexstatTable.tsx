"use client";

import { useState, useMemo } from 'react';
import {
  Table,
  ScrollArea,
  Paper,
  Text,
  Group,
  Badge,
  ActionIcon,
  Tooltip,
  SegmentedControl,
  Stack,
  Center,
  Box,
} from '@mantine/core';
import { IconSortAscending, IconSortDescending, IconArrowsSort } from '@tabler/icons-react';
import { ComexstatDataItem } from './types';
import { formatCurrency, formatWeight, getMonthName } from './utils';

type SortField = 'state' | 'country' | 'metricFOB' | 'metricKG' | 'metricCIF' | 'metricFreight' | 'metricInsurance' | 'monthNumber';
type SortDirection = 'asc' | 'desc' | null;

interface ComexstatTableProps {
  data: ComexstatDataItem[];
  isLoading?: boolean;
}

export function ComexstatTable({ data, isLoading }: ComexstatTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection) return data;

    return [...data].sort((a, b) => {
      let valueA: string | number = a[sortField] ?? '';
      let valueB: string | number = b[sortField] ?? '';

      // Converte para número se for uma métrica
      if (sortField.startsWith('metric') || sortField === 'monthNumber') {
        valueA = parseFloat(String(valueA)) || 0;
        valueB = parseFloat(String(valueB)) || 0;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB, 'pt-BR')
          : valueB.localeCompare(valueA, 'pt-BR');
      }

      return sortDirection === 'asc' 
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
  }, [data, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <IconArrowsSort size={14} style={{ opacity: 0.4 }} />;
    }
    return sortDirection === 'asc' 
      ? <IconSortAscending size={14} /> 
      : <IconSortDescending size={14} />;
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Table.Th 
      style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      onClick={() => handleSort(field)}
    >
      <Group gap={4} wrap="nowrap">
        {children}
        <SortIcon field={field} />
      </Group>
    </Table.Th>
  );

  if (!data || data.length === 0) {
    return (
      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Center>
          <Text c="dimmed">Nenhum dado encontrado. Faça uma consulta para visualizar os resultados.</Text>
        </Center>
      </Paper>
    );
  }

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={600} size="lg">Resultados da Consulta</Text>
          <Badge color="teal" variant="light" size="lg">
            {data.length} registros
          </Badge>
        </Group>

        <ScrollArea>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Ano</Table.Th>
                <SortableHeader field="monthNumber">Mês</SortableHeader>
                <SortableHeader field="country">País</SortableHeader>
                <SortableHeader field="state">Estado</SortableHeader>
                <Table.Th>NCM</Table.Th>
                <SortableHeader field="metricFOB">FOB (USD)</SortableHeader>
                <SortableHeader field="metricCIF">CIF (USD)</SortableHeader>
                <SortableHeader field="metricKG">Peso (KG)</SortableHeader>
                <SortableHeader field="metricFreight">Frete (USD)</SortableHeader>
                <SortableHeader field="metricInsurance">Seguro (USD)</SortableHeader>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {sortedData.map((item, index) => (
                <Table.Tr key={`${item.coNcm}-${item.year}-${item.monthNumber}-${item.state}-${index}`}>
                  <Table.Td>{item.year}</Table.Td>
                  <Table.Td>
                    <Tooltip label={getMonthName(item.monthNumber)}>
                      <span>{item.monthNumber}</span>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td>{item.country}</Table.Td>
                  <Table.Td>{item.state}</Table.Td>
                  <Table.Td>
                    <Tooltip label={item.ncm} multiline w={300}>
                      <Text size="sm" truncate="end" maw={200}>
                        {item.coNcm}
                      </Text>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {formatCurrency(parseFloat(item.metricFOB))}
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {formatCurrency(parseFloat(item.metricCIF))}
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {formatWeight(parseFloat(item.metricKG))}
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {formatCurrency(parseFloat(item.metricFreight))}
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {formatCurrency(parseFloat(item.metricInsurance))}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
