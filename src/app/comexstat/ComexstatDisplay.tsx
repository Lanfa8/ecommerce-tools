"use client";

import { useState } from 'react';
import { 
  Stack, 
  Alert, 
  SegmentedControl, 
  Group, 
  Text,
  Center,
  Loader,
  Paper,
} from '@mantine/core';
import { IconAlertCircle, IconTable, IconChartBar } from '@tabler/icons-react';
import { useComexstatData } from '@/hooks/useComexstat';
import { ComexstatFilters } from './ComexstatFilters';
import { ComexstatTable } from './ComexstatTable';
import { ComexstatInsights } from './ComexstatInsights';
import { ComexstatDataItem, ComexstatRequest, FlowType } from './types';

type ViewMode = 'table' | 'insights';

export function ComexstatDisplay() {
  const [viewMode, setViewMode] = useState<ViewMode>('insights');
  const [data, setData] = useState<ComexstatDataItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { mutate: fetchData, isPending, error } = useComexstatData();

  const handleSearch = (params: {
    flow: FlowType;
    periodFrom: string;
    periodTo: string;
    countries: string[];
    ncm: string;
  }) => {
    if (!params.periodFrom || !params.periodTo) return;

    const request: ComexstatRequest = {
      flow: params.flow,
      monthDetail: true,
      period: {
        from: params.periodFrom,
        to: params.periodTo,
      },
      filters: [],
      details: ['country', 'state', 'ncm'],
      metrics: [
        'metricFOB',
        'metricKG',
        'metricStatistic',
        'metricFreight',
        'metricInsurance',
        'metricCIF',
      ],
    };

    // Adiciona filtro de países se selecionados
    if (params.countries.length > 0) {
      request.filters.push({
        filter: 'country',
        values: params.countries.map(c => parseInt(c)),
      });
    }

    // Adiciona filtro de NCM se preenchido
    if (params.ncm.trim()) {
      request.filters.push({
        filter: 'ncm',
        values: [params.ncm.trim()],
      });
    }

    setHasSearched(true);
    
    fetchData(request, {
      onSuccess: (response) => {
        setData(response.data?.list || []);
      },
      onError: () => {
        setData([]);
      },
    });
  };

  return (
    <Stack gap="lg">
      <ComexstatFilters onSearch={handleSearch} isLoading={isPending} />

      {error && (
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title="Erro na consulta" 
          color="red"
          variant="light"
        >
          {error.message || 'Ocorreu um erro ao consultar os dados. Tente novamente.'}
        </Alert>
      )}

      {isPending && (
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Center>
            <Stack align="center" gap="md">
              <Loader size="lg" color="teal" />
              <Text c="dimmed">Consultando dados do COMEXSTAT...</Text>
            </Stack>
          </Center>
        </Paper>
      )}

      {!isPending && hasSearched && data.length > 0 && (
        <>
          <Group justify="flex-end">
            <SegmentedControl
              value={viewMode}
              onChange={(value) => setViewMode(value as ViewMode)}
              data={[
                { 
                  label: (
                    <Group gap={6}>
                      <IconChartBar size={16} />
                      <span>Insights</span>
                    </Group>
                  ), 
                  value: 'insights' 
                },
                { 
                  label: (
                    <Group gap={6}>
                      <IconTable size={16} />
                      <span>Tabela</span>
                    </Group>
                  ), 
                  value: 'table' 
                },
              ]}
            />
          </Group>

          {viewMode === 'insights' ? (
            <ComexstatInsights data={data} />
          ) : (
            <ComexstatTable data={data} />
          )}
        </>
      )}

      {!isPending && hasSearched && data.length === 0 && !error && (
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title="Nenhum resultado" 
          color="yellow"
          variant="light"
        >
          Nenhum dado encontrado para os filtros selecionados. Tente ajustar os parâmetros da consulta.
        </Alert>
      )}
    </Stack>
  );
}
