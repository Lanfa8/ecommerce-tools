"use client";

import { useState } from 'react';
import {
  Paper,
  Grid,
  TextInput,
  Select,
  MultiSelect,
  Button,
  Group,
  Text,
  Stack,
  Loader,
  Collapse,
  ActionIcon,
} from '@mantine/core';
import { IconSearch, IconChevronDown, IconChevronUp, IconFilter } from '@tabler/icons-react';
import { useCountries, useNcmValues } from '@/hooks/useComexstat';
import { FlowType } from './types';
import { getDefaultPeriod } from './utils';

interface ComexstatFiltersProps {
  onSearch: (params: {
    flow: FlowType;
    periodFrom: string;
    periodTo: string;
    countries: string[];
    ncm: string;
  }) => void;
  isLoading?: boolean;
}

// Gera lista de meses para seleção (últimos 5 anos)
function generateMonthOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  const now = new Date();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  for (let year = now.getFullYear(); year >= now.getFullYear() - 5; year--) {
    const maxMonth = year === now.getFullYear() ? now.getMonth() + 1 : 12;
    for (let month = maxMonth; month >= 1; month--) {
      const value = `${year}-${String(month).padStart(2, '0')}`;
      const label = `${monthNames[month - 1]}/${year}`;
      options.push({ value, label });
    }
  }
  
  return options;
}

export function ComexstatFilters({ onSearch, isLoading }: ComexstatFiltersProps) {
  const defaultPeriod = getDefaultPeriod();
  const monthOptions = generateMonthOptions();
  
  const [flow, setFlow] = useState<FlowType>('import');
  const [periodFrom, setPeriodFrom] = useState<string>(defaultPeriod.from);
  const [periodTo, setPeriodTo] = useState<string>(defaultPeriod.to);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [ncmValue, setNcmValue] = useState<string>('');
  const [ncmSearch, setNcmSearch] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { data: countriesData, isLoading: loadingCountries } = useCountries();
  const { data: ncmData, isLoading: loadingNcm } = useNcmValues();

  // Prepara opções de países
  const countryOptions = countriesData?.data?.map(c => ({
    value: String(c.id),
    label: c.text || '',
  })) || [];

  // Prepara opções de NCM (limitado a 100 para performance)
  const ncmOptions = ncmData?.data
    ?.filter(n => 
      ncmSearch === '' || 
      n?.text.toLowerCase().includes(ncmSearch?.toLowerCase()) ||
      String(n.noNcm || n.id).includes(ncmSearch)
    )
    .slice(0, 100)
    .map(n => ({
      value: String(n.noNcm || n.id),
      label: `${n.noNcm || n.id} - ${n.text}`,
    })) || [];



  const handleSearch = () => {
    onSearch({
      flow,
      periodFrom,
      periodTo,
      countries: selectedCountries,
      ncm: ncmValue,
    });
  };

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="xs">
            <IconFilter size={20} />
            <Text fw={600} size="lg">Filtros de Consulta</Text>
          </Group>
          <ActionIcon 
            variant="subtle" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            title={showAdvanced ? 'Ocultar filtros avançados' : 'Mostrar filtros avançados'}
          >
            {showAdvanced ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
          </ActionIcon>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              label="Tipo de Fluxo"
              placeholder="Selecione"
              value={flow}
              onChange={(value) => setFlow(value as FlowType)}
              data={[
                { value: 'import', label: 'Importação' },
                { value: 'export', label: 'Exportação' },
              ]}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              label="Período Início"
              placeholder="Selecione"
              value={periodFrom}
              onChange={(value) => setPeriodFrom(value || '')}
              data={monthOptions}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              label="Período Fim"
              placeholder="Selecione"
              value={periodTo}
              onChange={(value) => setPeriodTo(value || '')}
              data={monthOptions}
              searchable
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <TextInput
              label="Código NCM"
              placeholder="Ex: 72292000"
              value={ncmValue}
              onChange={(e) => setNcmValue(e.currentTarget.value)}
            //   description="Digite o código NCM completo"
            />
          </Grid.Col>

            

        </Grid>


        <Collapse in={showAdvanced}>
          <Grid mt="md">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <MultiSelect
                label="Países"
                placeholder="Todos os países"
                data={countryOptions}
                value={selectedCountries}
                onChange={setSelectedCountries}
                searchable
                clearable
                nothingFoundMessage="Nenhum país encontrado"
                rightSection={loadingCountries ? <Loader size="xs" /> : null}
                maxDropdownHeight={300}
              />
            </Grid.Col>

            {/* <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="NCM (busca)"
                placeholder="Busque por código ou descrição"
                data={ncmOptions}
                value={ncmValue}
                onChange={(value) => setNcmValue(value || '')}
                searchable
                clearable
                nothingFoundMessage={loadingNcm ? "Carregando..." : "Nenhum NCM encontrado"}
                onSearchChange={setNcmSearch}
                rightSection={loadingNcm ? <Loader size="xs" /> : null}
                maxDropdownHeight={300}
              />
            </Grid.Col> */}
          </Grid>
        </Collapse>

        <Group justify="flex-end" mt="md">
          <Button 
            onClick={handleSearch} 
            leftSection={<IconSearch size={18} />}
            loading={isLoading}
            disabled={!periodFrom || !periodTo}
          >
            Consultar
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
